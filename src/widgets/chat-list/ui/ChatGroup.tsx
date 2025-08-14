import {TChat} from "@/entities/chat/model";
import {ChatCard} from "@/widgets/chat-list/ui/ChatCard";

type ChatGroupProps = {
  groupIndex: number;
  date: string;
  chats: TChat[];
}

export function ChatGroup({groupIndex, date, chats}: ChatGroupProps) {
  return <div className="flex flex-col gap-2">
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
      {chats.map((chat: TChat, chatIndex: number) => (
        <li key={chat.id}>
          <ChatCard
            index={chatIndex}
            groupIndex={groupIndex} {...chat} />
        </li>
      ))}
    </ul>
  </div>;
}