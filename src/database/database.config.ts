import Dexie, {EntityTable} from 'dexie';
import {TChat, TMessage} from '@/types';

const db = new Dexie('impersonator') as Dexie & {
  chats: EntityTable<TChat>;
  messages: EntityTable<TMessage>;
};

db.version(1).stores({
  chats: 'id, createdAt, updatedAt, name, [id]',
  messages: 'id, createdAt, updatedAt, chatId, type, text, [chatId+updatedAt]',
});

export const chatsTable = db.table('chats');
export const messagesTable = db.table('messages');

export default db;
