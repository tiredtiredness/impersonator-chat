'use client';

import {HeadCircuitIcon} from '@phosphor-icons/react/dist/ssr';
import {ReactNode} from 'react';
import {ChatHistory} from '@/widgets/chat-history/ui/ChatHistory';
import {XIcon} from '@phosphor-icons/react/ssr';
import {Button} from '@/shared/ui/button/Button';
import {useMobileMenu} from '@/shared/hooks/useMobileMenu';

export default function Layout({children}: {children: ReactNode}) {
  const {isOpen, setIsOpen} = useMobileMenu();

  return (
    <div className="flex h-dvh gap-6 md:pl-6">
      <aside
        className={`${isOpen ? 'left-0' : '-left-full'} bg-opacity-10 bg-opacity-25 fixed top-0 bottom-0 z-10 flex w-dvw shrink-0 flex-col gap-4 bg-neutral-200/50 p-1 pt-5 pb-4 backdrop-blur-lg backdrop-filter transition-[left] duration-500 md:static md:mt-8 md:w-2xs md:bg-transparent md:pt-1`}
      >
        <header>
          <h1 className="flex items-center justify-center gap-1 text-3xl">
            <span className="hidden sm:inline">Impersonator</span>
            <HeadCircuitIcon />
          </h1>
        </header>
        <Button
          onClick={() => setIsOpen(false)}
          className="absolute right-5 md:hidden"
          title="Скрыть историю чатов"
        >
          <XIcon />
        </Button>

        <ChatHistory />
      </aside>
      <main className="flex grow">{children}</main>
    </div>
  );
}
