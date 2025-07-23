import {useLiveQuery} from "dexie-react-hooks";
import {v4 as uuidv4} from "uuid";
import {useCallback, useState} from "react";
import {chatsTable, TChat} from "@/entities/chat/model";

export const useChat = (chatId?: string) => {
  const chat =
    useLiveQuery<TChat | null>(() => {
      if (!chatId) {
        return null;
      }
      return chatsTable.where({id: chatId}).first();
    }, [chatId]) ?? null;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createChat = useCallback(async function (name: string) {
    setIsLoading(true);
    const now = new Date().toISOString()
    const chat: TChat = {
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
      name,
    };
    try {
      await chatsTable.add(chat);
      return chat;
    } catch (error) {
      console.error(`Failed to add ${chat}: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {chat, createChat, isLoading};
};
