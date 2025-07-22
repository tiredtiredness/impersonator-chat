import {Chat} from "@/types";
import {groupBy} from "@/utils";
import Link from "next/link";

type ChatHistoryProps = {
  chats: Chat[];
};

export function ChatHistory({chats}: ChatHistoryProps) {
  const groupedChats = groupBy(chats, "createdAt", (time: string) => {
    return new Date(time).toISOString().split("T")[0];
  }).toSorted((d1, d2) => new Date(d2[0]).getTime() - new Date(d1[0]).getTime());
  console.log(groupedChats);
  return (
    <ul className="w-3xs grow space-y-4">
      {groupedChats.map(([date, chats]) => (
        <li key={date}>
          <div className="flex flex-col gap-1">
            <p className="font-bold">
              {new Date(date).toLocaleDateString("ru", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <ul className="flex flex-col gap-2">
              {chats.map((chat: Chat) => (
                <li key={chat.id}>
                  <Link
                    href={`/chat/${chat.id}`}
                    className="backdrop-blur-sm backdrop-filter text-sm w-full rounded-xl bg-stone-50 px-3 py-1  transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
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
