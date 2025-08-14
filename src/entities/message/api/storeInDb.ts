import { v4 as uuidv4 } from 'uuid';
import { messagesTable, TMessage } from '@/entities/message/model';

export const storeInDb = async (
  chatId: string,
  type: 'bot' | 'user',
  text: string,
  messageId?: string
): Promise<string> => {
  const now = new Date().toISOString();

  if (messageId) {
    // Обновляем существующее сообщение
    const updatedCount = await messagesTable
      .where('id')
      .equals(messageId)
      .modify({ text, updatedAt: now });

    if (updatedCount === 0) {
      console.warn(`[storeInDb] Message with id ${messageId} not found for update`);
    }

    return messageId;
  } else {
    // Создаём новое сообщение
    const message: TMessage = {
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
      type,
      text,
      chatId,
    };

    await messagesTable.add(message);
    return message.id;
  }
};