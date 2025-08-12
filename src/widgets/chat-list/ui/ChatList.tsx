"use client";

import Link from "next/link";
import {ChatsTeardropIcon, Trash} from "@phosphor-icons/react/ssr";
import {TChat} from "@/entities/chat/model";
import {useChats} from "@/entities/chat/model/useChats";
import {Avatar} from "@/entities/message/ui/Avatar";
import {createUrlFromBlob, useImageGeneration} from "@/shared/lib";
import {useMobileMenu} from "@/shared/lib/hooks/useMobileMenu";
import {groupBy} from "@/shared/lib/utils";
import {Button, Loader} from "@/shared/ui";
import {useDeleteChat} from "@/features/delete-chat/model";

export function ChatList() {
  const {chats, isLoading: isLoadingChats} = useChats();
  const {setIsOpen} = useMobileMenu();
  const {isImageGenerating} = useImageGeneration();
  const {deleteChat} = useDeleteChat()

  const groupedChats = groupBy(chats, "updatedAt", (time: string) => {
    return new Date(time).toLocaleString("en-US").split(",")[0];
  }).toSorted((d1, d2) => new Date(d2[0]).getTime() - new Date(d1[0]).getTime());

  if (isLoadingChats) {
    return (
      <div className="flex grow items-center justify-center">
        <Loader size="32" />
      </div>
    );
  }

  if (!chats) return null;

  if (!groupedChats.length) {
    return (
      <div className="flex grow flex-col items-center justify-center py-12 text-center select-none">
        <div className="mb-4 animate-pulse text-6xl">
          <ChatsTeardropIcon />
        </div>
        <p className="mb-2 text-lg font-semibold">История чатов пуста</p>
        <p className="max-w-xs">Начни новый чат, чтобы здесь появилась история общения.</p>
      </div>
    );
  }

  return (
    <ul className="grow space-y-4 overflow-y-auto md:pr-4">
      {groupedChats.map(([date, chats], chatGroupIndex: number) => (
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
              {chats.map((chat: TChat, chatIndex: number) => (
                <li key={chat.id}>
                  <div className='relative group'>
                    <Link
                      href={`/chat/${chat.id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex gap-2 items-center w-full rounded-xl bg-zinc-50/50 p-1.5 text-sm backdrop-blur-sm backdrop-filter focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
                    >
                      <Avatar
                        isGenerating={chatGroupIndex === 0 && chatIndex === 0 && isImageGenerating}
                        url={createUrlFromBlob(chat.image)}
                        size={60}
                        rounded="xl"
                      />
                      <span className="truncate text-center grow">{chat.name}</span>
                    </Link>
                    <Button className='group-hover-always:opacity-100 group-hover-always:pointer-events-auto pointer-events-none opacity-0 absolute top-1/2 right-2 -translate-y-1/2 ' onClick={()=>deleteChat(chat.id)} ><Trash /></Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
