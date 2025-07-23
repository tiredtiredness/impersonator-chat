import Dexie, {EntityTable} from 'dexie';
import {TChat} from '@/entities/chat/model';
import {TMessage} from '@/entities/message/model';

export const db = new Dexie('impersonator') as Dexie & {
  chats: EntityTable<TChat>;
  messages: EntityTable<TMessage>;
};

db.version(1).stores({
  chats: 'id, createdAt, updatedAt, name',
  messages: 'id, createdAt, updatedAt, chatId, type, text, [chatId+updatedAt]',
});
