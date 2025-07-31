'use client';

import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {FormEvent, useEffect, useState} from 'react';
import {ListIcon, UserPlusIcon} from '@phosphor-icons/react/ssr';
import {useCreateChat} from '@/features/create-chat';
import {validateName} from '@/shared/lib';
import {useMobileMenu} from '@/shared/lib/hooks/useMobileMenu';
import {Button} from '@/shared/ui/button/Button';
import {Input} from '@/shared/ui/input/Input';

export function NewChatPage() {
  const router = useRouter();
  const {createChat, isLoading} = useCreateChat();
  const [name, setName] = useState<string>('');
  const [error, setError] = useState('');
  const {setIsOpen} = useMobileMenu();

  const create = async (event: FormEvent) => {
    event.preventDefault();
    const nameError = validateName(name);
    if (nameError) {
      setError(nameError);
      return;
    }
    setError('');
    const newChat = await createChat(name);
    if (newChat?.id) {
      router.push(`/chat/${newChat.id}`);
    }
  };

  return (
    <section className="m-1 flex grow flex-col rounded-4xl bg-zinc-50/50 p-1">
      <div className="relative mx-6 my-6 flex items-center justify-center font-light">
        <Button
          onClick={() => setIsOpen(true)}
          className="absolute left-0 block md:hidden"
          title="Показать историю чатов"
        >
          <ListIcon />
        </Button>
        <h2 className="text-3xl">Новый чат</h2>
      </div>
      <div className="mx-6 flex grow flex-col justify-center gap-6 rounded-4xl lg:mx-10">
        <div className="flex items-center gap-6">
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
          <label htmlFor="chat-name" className="sr-only">
            Имя персонажа
          </label>
          <Input
            id="chat-name"
            value={name}
            setValue={setName}
            placeholder="Например, Альберт Эйнштейн"
            isDisabled={isLoading}
            isButtonDisabled={isLoading}
            buttonIcon={<UserPlusIcon />}
            buttonTitle="Создать чат"
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </form>
        <p className="text-xs text-gray-400">
          Контент этого чата создаётся автоматически с использованием искусственного интеллекта и
          предназначен исключительно для развлекательных целей. Представленные персонажи являются
          вымышленными, не являются реальными людьми, не выражают чьи-либо личные мнения и не
          отражают взгляды каких-либо организаций.
        </p>
      </div>
    </section>
  );
}
