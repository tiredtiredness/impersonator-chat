import {useLiveQuery} from 'dexie-react-hooks';
import {chatsTable, messagesTable} from '@/database/database.config';
import Dexie from 'dexie';
import {TMessage} from '@/types';
import {v4 as uuidv4} from 'uuid';
import {useState} from 'react';
import {send} from '@/api';

export function useMessages(chatId: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messages =
    useLiveQuery<TMessage[]>(() =>
      messagesTable
        .where('[chatId+createdAt]')
        .between([chatId, Dexie.minKey], [chatId, Dexie.maxKey])
        .toArray(),
    ) ?? [];

  function createMessageInDB(type: 'bot' | 'user', text: string) {
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
      setIsLoading(true);
      createMessageInDB('user', text);
      const answer = await send(to, text);
      createMessageInDB('bot', answer);
      await chatsTable.where('id').equals(chatId).modify({updatedAt: new Date().toISOString()});
      console.log(await chatsTable.where('id').equals(chatId).toArray());
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return {messages, sendMessage, isLoading};
}
