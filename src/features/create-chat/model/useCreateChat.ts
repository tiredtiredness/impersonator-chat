import {v4 as uuidv4} from 'uuid';
import {useCallback, useState} from 'react';
import {chatsTable, TChat} from '@/entities/chat/model';

export const useCreateChat = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createChat = useCallback(async function (name: string) {
    setIsLoading(true);
    const now = new Date().toISOString();
    const newChat: TChat = {
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
      name,
    };
    try {
      await chatsTable.add(newChat);
      return newChat;
    } catch (error) {
      console.error(`Failed to add ${newChat}: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {createChat, isLoading};
};
