import {useLiveQuery} from "dexie-react-hooks";
import Dexie from "dexie";
import {v4 as uuidv4} from "uuid";
import {useState} from "react";
import {send} from "@/entities/message/api/send";
import {messagesTable, TMessage} from "@/entities/message/model";
import {chatsTable} from "@/entities/chat/model";

export function useMessages(chatId: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messages =
    useLiveQuery<TMessage[]>(() =>
      messagesTable
        .where("[chatId+updatedAt]")
        .between([chatId, Dexie.minKey], [chatId, Dexie.maxKey])
        .toArray(),
    ) ?? [];

  function createMessageInDB(type: "bot" | "user", text: string) {
    const message: TMessage = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type,
      text,
      chatId,
    };
    messagesTable.add(message);
  }

  async function sendMessage(to: string, text: string) {
    try {
      if (!text.trim()) {
        return;
      }

      setIsLoading(true);
      createMessageInDB("user", text);
      await chatsTable.where("id").equals(chatId).modify({updatedAt: new Date().toISOString()});

      const answer = await send(to, text);
      if (!answer || typeof answer !== "string" || !answer.trim()) {
        throw new Error("Пустой ответ от сервера");
      }

      createMessageInDB("bot", answer);
    } catch (err) {
      console.error("Ошибка при отправке сообщения:", err);
      createMessageInDB("bot", "⚠️ Произошла ошибка. Пожалуйста, попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  }

  return {messages, sendMessage, isLoading};
}
