import {TChat, TMessage} from '@/types';

export const mockChat: TMessage[] = [
  {
    id: '1',
    chatId: '1',
    type: 'user',
    text: 'почему сортировка не работает',
    createdAt: '2025-07-21T21:30:00.000Z',
    updatedAt: '2025-07-21T21:30:00.000Z',
  },
  {
    id: '2',
    chatId: '1',
    type: 'bot',
    text: 'Сортировка в этом коде **не работает**, потому что ты вызываешь `.toSorted()` **не на массиве**, а на **объекте**, возвращаемом `groupBy`.\n\nМетод `.toSorted()` доступен только у **массивов**, а `grouped` — это **объект**, и у него нет `.toSorted()`.\n\nЧтобы отсортировать результат, оберни `groupBy` в `Object.entries(...)`, и потом вызови `.sort(...)`:\n\n```ts\nconst groupedChats = Object.entries(\n  groupBy(chats, "createdAt", (time: string) => {\n    return new Date(time).toISOString().split("T")[0];\n  })\n).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());\n```\n\nЕсли хочешь обратно получить объект — оберни в `Object.fromEntries(...)`.',
    createdAt: '2025-07-21T21:30:01.000Z',
    updatedAt: '2025-07-21T21:30:01.000Z',
  },
  {
    id: '3',
    chatId: '1',
    type: 'user',
    text: 'почему сортировка не работает',
    createdAt: '2025-07-21T21:30:00.000Z',
    updatedAt: '2025-07-21T21:30:00.000Z',
  },
  {
    id: '4',
    chatId: '1',
    type: 'bot',
    text: 'Сортировка в этом коде **не работает**, потому что ты вызываешь `.toSorted()` **не на массиве**, а на **объекте**, возвращаемом `groupBy`.\n\nМетод `.toSorted()` доступен только у **массивов**, а `grouped` — это **объект**, и у него нет `.toSorted()`.\n\nЧтобы отсортировать результат, оберни `groupBy` в `Object.entries(...)`, и потом вызови `.sort(...)`:\n\n```ts\nconst groupedChats = Object.entries(\n  groupBy(chats, "createdAt", (time: string) => {\n    return new Date(time).toISOString().split("T")[0];\n  })\n).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());\n```\n\nЕсли хочешь обратно получить объект — оберни в `Object.fromEntries(...)`.',
    createdAt: '2025-07-21T21:30:01.000Z',
    updatedAt: '2025-07-21T21:30:01.000Z',
  },
  {
    id: '5',
    chatId: '1',
    type: 'user',
    text: 'почему сортировка не работает groupedChats = Object.entries( groupBy(chats, "createdAt", (time: string) => { return new Date(time).toISOString().split("T")[0]; }) ).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()); ``` Если хочешь обратно получить объект — оберни в `Object.fromEntries(...)`.',
    createdAt: '2025-07-21T21:30:00.000Z',
    updatedAt: '2025-07-21T21:30:00.000Z',
  },
  {
    id: '6',
    chatId: '1',
    type: 'bot',
    text: 'Сортировка в этом коде **не работает**, потому что ты вызываешь `.toSorted()` **не на массиве**, а на **объекте**, возвращаемом `groupBy`.\n\nМетод `.toSorted()` доступен только у **массивов**, а `grouped` — это **объект**, и у него нет `.toSorted()`.\n\nЧтобы отсортировать результат, оберни `groupBy` в `Object.entries(...)`, и потом вызови `.sort(...)`:\n\n```ts\nconst groupedChats = Object.entries(\n  groupBy(chats, "createdAt", (time: string) => {\n    return new Date(time).toISOString().split("T")[0];\n  })\n).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());\n```\n\nЕсли хочешь обратно получить объект — оберни в `Object.fromEntries(...)`.',
    createdAt: '2025-07-21T21:30:01.000Z',
    updatedAt: '2025-07-21T21:30:01.000Z',
  },
];

export const chatHistory: TChat[] = [
  {
    id: '1',
    name: 'Chat 1',
    createdAt: '2025-07-21T21:25:13.984Z',
    updatedAt: '2025-07-21T21:25:13.984Z',
  },
  {
    id: '2',
    name: 'Chat 2',
    createdAt: '2025-07-21T22:25:13.984Z',
    updatedAt: '2025-07-21T22:25:13.984Z',
  },
  {
    id: '3',
    name: 'Chat 3',
    createdAt: '2025-07-22T21:25:13.984Z',
    updatedAt: '2025-07-22T21:25:13.984Z',
  },
  {
    id: '4',
    name: 'Chat 4',
    createdAt: '2025-07-20T21:25:13.984Z',
    updatedAt: '2025-07-20T21:25:13.984Z',
  },
  {
    id: '5',
    name: 'Chat 5',
    createdAt: '2025-07-20T21:25:13.984Z',
    updatedAt: '2025-07-20T21:25:13.984Z',
  },
  {
    id: '6',
    name: 'Chat 6',
    createdAt: '2025-06-19T21:25:13.984Z',
    updatedAt: '2025-06-19T21:25:13.984Z',
  },
];
