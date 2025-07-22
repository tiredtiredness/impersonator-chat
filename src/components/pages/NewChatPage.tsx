'use client';

import {useRouter} from 'next/navigation';
import {useChat} from '@/hooks/useChat';
import {FormEvent, useState} from 'react';
import Image from 'next/image';
import {ListIcon, UserPlusIcon} from '@phosphor-icons/react/ssr';
import {useMobileMenu} from '@/contexts/MobileMenuContext';
import {Input} from '@/components/Input';
import {Button} from '@/components/Button';

export function NewChatPage() {
  const router = useRouter();
  const {createChat, isLoading} = useChat();
  const [name, setName] = useState<string>('');
  const {setIsOpen} = useMobileMenu();
  const create = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      return;
    }
    const chat = await createChat(name);
    router.push(`/chat/${chat?.id}`);
  };

  const isButtonDisabled = isLoading || !name.trim();

  return (
    <div className="m-1 flex grow flex-col rounded-4xl bg-zinc-50/50 p-1">
      <header className="relative mx-6 my-6 flex items-center justify-center font-light">
        <Button onClick={() => setIsOpen(true)} className="absolute left-0 block md:hidden">
          <ListIcon />
        </Button>
        <h2 className="text-3xl">Новый чат</h2>
      </header>
      <main className="flex grow flex-col justify-center gap-6 rounded-4xl">
        <div className="mx-10 flex items-center gap-6">
          <Image
            src="/impersonator.webp"
            alt="Head of impersonator"
            width={80}
            height={80}
            className="-scale-x-100 rounded-full"
          />
          <div>
            <h2 className="text-xl">Привет!</h2>
            <p className="text-xl font-bold">С кем хочешь пообщаться?</p>
          </div>
        </div>
        <form onSubmit={create}>
          <Input
            value={name}
            setValue={setName}
            placeholder="Например, Альберт Эйнштейн"
            isDisabled={isLoading}
            isButtonDisabled={isButtonDisabled}
            buttonIcon={<UserPlusIcon />}
          />
        </form>
      </main>
    </div>
  );
}
