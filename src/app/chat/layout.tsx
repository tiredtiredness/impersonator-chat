'use client';

import {HeadCircuitIcon} from '@phosphor-icons/react/dist/ssr';
import {ReactNode} from 'react';
import {ChatHistory} from '@/components/ChatHistory';
import Link from 'next/link';
import {GearIcon} from '@phosphor-icons/react/ssr';
import {useChat} from "@/hooks/useChat";

export default function Layout({children}: {children: ReactNode}) {
  const {chats} = useChat()

  return (
    <div className="flex h-dvh gap-6 pl-6">
      <div className="mt-8 flex w-xs shrink-0 flex-col gap-4 p-1">
        <h1 className="flex items-center justify-center gap-1 text-3xl">
          Impersonator <HeadCircuitIcon />
        </h1>
        <h2 className="text-center font-light">История чатов</h2>
        <ChatHistory chats={chats} />
        <footer className="flex justify-end">
          <Link
            href="../settings"
            className="cursor-pointer rounded-full bg-neutral-100 p-3 text-3xl transition-colors hover:bg-blue-500 hover:text-white"
          >
            <GearIcon size={16} weight="thin" />
          </Link>
        </footer>
      </div>
      {children}
    </div>
  );
}
