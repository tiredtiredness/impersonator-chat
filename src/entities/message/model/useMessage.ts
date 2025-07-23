import {useCallback, useState} from "react";
import {send} from "@/entities/message/api/send";
import {chatsTable} from "@/entities/chat/model";
import {storeInDb} from "@/entities/message/api";

export function useMessage(chatId: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = useCallback(async function (to: string, text: string) {
    try {
      if (!text.trim()) {
        return;
      }

      setIsLoading(true);
      await storeInDb(chatId, "user", text);
      await chatsTable.where("id").equals(chatId).modify({updatedAt: new Date().toISOString()});

      const answer = await send(to, text);
      if (!answer || typeof answer !== "string" || !answer.trim()) {
        throw new Error("Пустой ответ от сервера");
      }

      await storeInDb(chatId, "bot", answer);
    } catch (err) {
      console.error("Ошибка при отправке сообщения:", err);
      try {
        await storeInDb(chatId, "bot", "⚠️ Произошла ошибка. Пожалуйста, попробуйте позже.");
      } catch (dbErr) {
        console.error("Ошибка при сохранении ошибки в БД:", dbErr);
      }
    } finally {
      setIsLoading(false);
    }
  }, [chatId]);

  return {sendMessage, isLoading};
}
