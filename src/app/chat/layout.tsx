'use client';

import {HeadCircuitIcon} from '@phosphor-icons/react/dist/ssr';
import {ReactNode} from 'react';
import {ChatHistory} from '@/components/ChatHistory';
import {XIcon} from '@phosphor-icons/react/ssr';
import {useMobileMenu} from '@/contexts/MobileMenuContext';
import {Button} from '@/components/Button';

export default function Layout({children}: {children: ReactNode}) {
  const {isOpen, setIsOpen} = useMobileMenu();

  return (
    <div className="flex h-dvh gap-6 md:pl-6">
      <div
        className={`${isOpen ? 'left-0' : '-left-full'} bg-opacity-10 bg-opacity-25 fixed top-0 bottom-0 z-10 flex w-dvw shrink-0 flex-col gap-4 bg-neutral-200/50 p-1 pt-8 pb-4 backdrop-blur-lg backdrop-filter transition-[left] duration-500 md:static md:mt-8 md:w-2xs md:bg-transparent md:pt-1`}
      >
        <h1 className="flex items-center justify-center gap-1 text-3xl">
          <span className="hidden sm:inline">Impersonator</span>
          <HeadCircuitIcon />
        </h1>
        <Button onClick={() => setIsOpen(false)} className="absolute right-5 md:hidden">
          <XIcon />
        </Button>
        <h2 className="text-center font-light">История чатов</h2>
        <ChatHistory />
      </div>
      {children}
    </div>
  );
}
