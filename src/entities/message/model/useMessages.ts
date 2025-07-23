import {useLiveQuery} from 'dexie-react-hooks';
import Dexie from 'dexie';
import {messagesTable, TMessage} from '@/entities/message/model';

export function useMessages(chatId: string) {
  const messages =
    useLiveQuery<TMessage[]>(
      () =>
        messagesTable
          .where('[chatId+updatedAt]')
          .between([chatId, Dexie.minKey], [chatId, Dexie.maxKey])
          .toArray(),
      [chatId],
    ) ?? [];

  return {messages, isLoading: messages === undefined};
}
