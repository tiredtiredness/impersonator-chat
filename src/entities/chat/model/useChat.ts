import {useLiveQuery} from 'dexie-react-hooks';
import {v4 as uuidv4} from 'uuid';
import {useState} from 'react';
import {chatsTable, TChat} from "@/entities/chat/model";

export const useChat = (chatId?: string) => {
  const chat =
    useLiveQuery<TChat | null>(() => {
      if (!chatId) {
        return null;
      }
      return chatsTable.where({id: chatId}).first();
    }) ?? null;
  const chats =
    useLiveQuery<TChat[]>(() => chatsTable.orderBy('updatedAt').reverse().toArray()) ?? [];
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
