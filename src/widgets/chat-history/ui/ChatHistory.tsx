"use client";

import {groupBy} from "@/shared/lib/utils";
import Link from "next/link";
import {useChat} from "@/entities/chat/model/useChat";
import {useMobileMenu} from "@/shared/hooks/useMobileMenu";
import {TChat} from "@/entities/chat/model";

export function ChatHistory() {
  const {chats} = useChat();
  const {setIsOpen} = useMobileMenu();
  if (!chats) return null;

  const groupedChats = groupBy(chats, "updatedAt", (time: string) => {
    return new Date(time).toLocaleString("en-US").split(",")[0];
  }).toSorted((d1, d2) => new Date(d2[0]).getTime() - new Date(d1[0]).getTime());

  return (
    <ul className="grow space-y-4 overflow-y-auto px-4 md:pr-4">
      {groupedChats.map(([date, chats]) => (
        <li key={date}>
          <div className="flex flex-col gap-2">
            <time
              dateTime={date}
              className="ml-3 text-sm font-bold"
            >
              {new Date(date).toLocaleDateString("ru", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
            <ul className="m-1 flex flex-col gap-2.5 pb-1">
              {chats.map((chat: TChat) => (
                <li key={chat.id}>
                  <Link
                    href={`/chat/${chat.id}`}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex w-full rounded-xl bg-zinc-50/50 px-3 py-1.5 text-sm backdrop-blur-sm backdrop-filter focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
                  >
                    <span className="truncate">{chat.name}</span>
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
