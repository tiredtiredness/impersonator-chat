import { useLiveQuery } from 'dexie-react-hooks';
import { TChat, chatsTable } from '@/entities/chat/model';

export const useChats = () => {
  const chats = useLiveQuery<TChat[]>(() => chatsTable.orderBy('updatedAt').reverse().toArray());
  const isLoading = chats === undefined;

  return { chats: chats ?? [], isLoading };
};