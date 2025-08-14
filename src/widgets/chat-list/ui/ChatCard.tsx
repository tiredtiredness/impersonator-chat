"use client";

import Link from "next/link";
import {TChat, useBotProfile} from "@/entities/chat/model";
import {Avatar} from "@/entities/message/ui/Avatar";
import {Button} from "@/shared/ui";
import {Trash} from "@phosphor-icons/react";
import {useImageGeneration, useMobileMenu} from "@/shared/lib";
import {useDeleteChat} from "@/features/delete-chat/model";

type ChatCardProps = TChat & {
  groupIndex: number;
  index: number
}

export function ChatCard({id, name, groupIndex, index}: ChatCardProps) {
  const {url} = useBotProfile(id);
  const {setIsOpen} = useMobileMenu();
  const {isImageGenerating} = useImageGeneration();
  const {deleteChat} = useDeleteChat();

  return <div className="relative group">
    <Link
      href={`/chat/${id}`}
      onClick={() => setIsOpen(false)}
      className="flex gap-2 items-center w-full rounded-xl bg-zinc-50/50 p-1.5 text-sm backdrop-blur-sm backdrop-filter focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
    >
      <Avatar
        isGenerating={groupIndex === 0 && index === 0 && isImageGenerating}
        url={url}
        size={60}
        rounded="xl"
      />
      <span className="truncate text-center grow">{name}</span>
    </Link>
    <Button
      className="group-hover-always:opacity-100 group-hover-always:pointer-events-auto pointer-events-none opacity-0 absolute top-1/2 right-2 -translate-y-1/2 "
      onClick={() => deleteChat(id)}
    ><Trash /></Button>
  </div>;
}