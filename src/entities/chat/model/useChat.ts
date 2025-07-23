import {useLiveQuery} from 'dexie-react-hooks';
import {chatsTable, TChat} from '@/entities/chat/model';

export const useChat = (chatId?: string) => {
  const chat =
    useLiveQuery<TChat | null>(() => {
      if (!chatId) {
        return null;
      }
      return chatsTable.where({id: chatId}).first();
    }, [chatId]) ?? null;

  return {chat, isLoading: chat === undefined};
};
