import {v4 as uuidv4} from 'uuid';
import {TMessage, messagesTable} from '@/entities/message/model';

export const storeInDb = async (chatId: string, type: 'bot' | 'user', text: string) => {
  const now = new Date().toISOString();
  const message: TMessage = {
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
    type,
    text,
    chatId,
  };
  await messagesTable.add(message);
};
