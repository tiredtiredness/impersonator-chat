'use client';

import Image from 'next/image';
import {CreateChatForm} from '@/widgets/forms';
import {useMobileMenu} from '@/shared/lib/hooks/useMobileMenu';
import {ChatHeader} from '@/shared/ui';

export function NewChatPage() {
  const {setIsOpen} = useMobileMenu();

  return (
    <section className="m-1 flex grow flex-col rounded-4xl bg-zinc-50/50 p-1">
      <ChatHeader title="Новый чат" onOpenSidebar={() => setIsOpen(true)} />
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
        <CreateChatForm />
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
