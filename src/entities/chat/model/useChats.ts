import {useLiveQuery} from 'dexie-react-hooks';
import {chatsTable, TChat} from '@/entities/chat/model';

export const useChats = () => {
  const chats =
    useLiveQuery<TChat[]>(() => chatsTable.orderBy('updatedAt').reverse().toArray()) ?? [];

  return {chats, isLoading: chats === undefined};
};
