import {TChat} from '@/types';
import {groupBy} from '@/utils';
import Link from 'next/link';

type ChatHistoryProps = {
  chats: TChat[];
};

export function ChatHistory({chats}: ChatHistoryProps) {
  if (!chats) return null;

  const groupedChats = groupBy(chats, 'createdAt', (time: string) => {
    return new Date(time).toISOString().split('T')[0];
  }).toSorted((d1, d2) => new Date(d2[0]).getTime() - new Date(d1[0]).getTime());

  return (
    <ul className="grow space-y-4 overflow-y-auto pr-4">
      {groupedChats.map(([date, chats]) => (
        <li key={date}>
          <div className="flex flex-col gap-1">
            <p className="font-bold">
              {new Date(date).toLocaleDateString('ru', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
            <ul className="flex flex-col gap-2 m-1 pb-1">
              {chats.map((chat: TChat) => (
                <li key={chat.id}>
                  <Link
                    href={`/chat/${chat.id}`}
                    className="w-full rounded-xl bg-neutral-100 px-3 py-1 text-sm backdrop-blur-sm backdrop-filter focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
                  >
                    {chat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
