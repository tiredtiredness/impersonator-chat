import {HeadCircuitIcon} from '@phosphor-icons/react/dist/ssr';
import {ReactNode} from 'react';
import {ChatHistory} from '@/components/ChatHistory';
import {Chat} from '@/types';
import Link from 'next/link';
import {GearIcon} from '@phosphor-icons/react/ssr';
import { chatHistory } from '@/data';


export default function Layout({children}: {children: ReactNode}) {
  return (
    <div className="flex h-dvh gap-6 pl-6">
      <div className="flex w-3xs flex-col p-1 gap-4 mt-8">
        <h1 className="flex items-center justify-center gap-1 text-3xl">
          Impersonator <HeadCircuitIcon />
        </h1>
        <h2 className='text-center font-light '>История чатов</h2>
        <ChatHistory chats={chatHistory} />
        <footer>
          <Link
            href="../settings"
            className="cursor-pointer rounded-full bg-zinc-100 p-3 text-3xl transition-colors hover:bg-blue-500 hover:text-white"
          >
            <GearIcon weight="thin" />
          </Link>
        </footer>
      </div>
      {children}
    </div>
  );
}
