// features/send-message/lib/useSendMessage.ts
import {useCallback, useState} from "react";
import {chatsTable} from "@/entities/chat/model";
import {storeInDb} from "@/entities/message/api";
import {messagesTable, TApiMessage} from "@/entities/message/model";

type StreamMessage = {
  type: "content" | "error";
  content: string;
};

export function useSendMessage(chatId?: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = useCallback(
    async function (to: string, text: string, history: TApiMessage[]) {
      if (!text.trim() || !chatId) return;

      setIsLoading(true);
      let botMessageId;

      try {
        await storeInDb(chatId, "user", text);
        await chatsTable.where("id").equals(chatId).modify({updatedAt: new Date().toISOString()});

        let fullAnswer = "";

        // Отправляем запрос на стриминг
        const resp = await fetch("/api/send-message", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({to, message: text, history}),
        });

        if (!resp.body) throw new Error("No response body");

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();

        // Генерируем ID для сообщения бота (чтобы обновлять его по частям)
        botMessageId = await storeInDb(chatId, "bot", ""); // создаём пустое
        setIsLoading(false);

        while (true) {
          const {done, value} = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const dataStr = line.slice(6);
              if (dataStr === "[DONE]") continue;

              try {
                const data: StreamMessage = JSON.parse(dataStr);
                if (data.type === "content") {
                  fullAnswer += data.content;
                  await messagesTable.where("id").equals(botMessageId).modify({text: fullAnswer});
                } else if (data.type === "error") {
                  throw new Error(data.content);
                }
              } catch (e) {
                console.warn("Failed to parse stream data:", e);
              }
            }
          }
        }

        if (!fullAnswer.trim()) {
          throw new Error("Empty response from server");
        }

        return fullAnswer;

      } catch (err) {
        console.error("Ошибка при отправке сообщения:", err);
        try {
          await storeInDb(chatId, "bot", "⚠️ Произошла ошибка. Пожалуйста, попробуйте позже.", botMessageId);
        } catch (dbErr) {
          console.error("Ошибка при сохранении ошибки в БД:", dbErr);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [chatId]
  );

  return {sendMessage, isLoading};
}