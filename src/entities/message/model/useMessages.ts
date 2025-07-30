import Dexie from 'dexie';
import {useLiveQuery} from 'dexie-react-hooks';
import {TMessage, messagesTable} from '@/entities/message/model';

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
