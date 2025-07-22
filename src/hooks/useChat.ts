import {TChat} from "@/types";
import {useLiveQuery} from "dexie-react-hooks";
import {chatsTable} from "@/database/database.config";
import {v4 as uuidv4} from "uuid";
import {useState} from "react";

export const useChat = (chatId?: string) => {
  const chat = useLiveQuery<TChat>(() => chatsTable.where({id: chatId}).first()) ?? null;
  const chats = useLiveQuery<TChat[]>(() => chatsTable.orderBy("createdAt").toArray()) ?? [];
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function createChat(name: string) {
    setIsLoading(true);
    const chat: TChat = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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
  }

  return {chat, chats, createChat, isLoading};
};
