"use client";

import {useChats} from "@/entities/chat/model/useChats";
import {groupBy} from "@/shared/lib/utils";
import {Loader} from "@/shared/ui";
import {EmptyChatList} from "@/widgets/chat-list/ui/EmptyChatList";
import {ChatGroup} from "@/widgets/chat-list/ui/ChatGroup";

export function ChatList() {
  const {chats, isLoading: isLoadingChats} = useChats();

  if (isLoadingChats) {
    return (
      <div className="flex grow h-full items-center justify-center">
        <Loader size="32" type='spinner'  />
      </div>
    );
  }

  if (!chats) return null;

  const groupedChats = groupBy(chats, "updatedAt", (time: string) => {
    return new Date(time).toLocaleString("en-US").split(",")[0];
  }).toSorted((d1, d2) => new Date(d2[0]).getTime() - new Date(d1[0]).getTime());

  if (!groupedChats.length) {
    return <EmptyChatList />;
  }

  return (
    <ul className="grow space-y-4 overflow-y-auto md:pr-4">
      {groupedChats.map(([date, chats], chatGroupIndex: number) => (
        <li key={date}>
          <ChatGroup groupIndex={chatGroupIndex} chats={chats} date={date} />
        </li>
      ))}
    </ul>
  );
}
