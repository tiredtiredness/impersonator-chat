'use client';

import {useParams} from 'next/navigation';
import {FormEvent, useEffect, useState} from 'react';
import {ArrowUpIcon, ListIcon, XIcon} from '@phosphor-icons/react/ssr';
import {useChat} from '@/entities/chat/model';
import {TApiMessage} from '@/entities/message/model';
import {useMessages} from '@/entities/message/model/useMessages';
import {useSendMessage} from '@/features/send-message';
import {ChatNotFound} from '@/widgets/chat-not-found';
import {MessageList} from '@/widgets/message-list';
import {PHRASES} from '@/shared/lib';
import {useMobileMenu} from '@/shared/lib/hooks/useMobileMenu';
import {Button, Input, Loader} from '@/shared/ui';

export function ChatPage() {
  const [msg, setMsg] = useState<string>('');
  const [phrase, setPhrase] = useState<string>('');
  const params = useParams();
  const chatId = params?.chatId as string | undefined;
  const {chat, isLoading: isLoadingChat} = useChat(chatId as string);
  const {messages, isLoading: isLoadingMessages} = useMessages(chatId as string);
  const {sendMessage, isLoading: isSending} = useSendMessage(chatId as string);
  const {setIsOpen} = useMobileMenu();

  useEffect(() => {
    const random = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    setPhrase(random);
  }, []);

  const send = async (event: FormEvent) => {
    event.preventDefault();
    if (!msg.trim() || !chat) {
      return;
    }
    setMsg('');

    const formattedMessages: TApiMessage[] = messages.map((msg) => ({
      role: msg.type === 'bot' ? 'assistant' : 'user',
      content: msg.text,
    }));

    await sendMessage(chat.name, msg, formattedMessages);
  };

  if (isLoadingMessages || isLoadingChat) {
    return (
      <section className="m-1 flex grow flex-col rounded-4xl bg-zinc-50/50 p-1">
        <div className="flex grow items-center justify-center">
          <Loader size="32" />
        </div>
      </section>
    );
  }

  if (!chat || !chatId) {
    return <ChatNotFound openMenu={() => setIsOpen(true)} />;
  }

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
        <h2 className="mx-12 break-after-all text-center text-xl font-semibold text-wrap break-all">
          {chat?.name} {phrase}
        </h2>
        <Button href="/chat/new" className="absolute right-0 cursor-pointer" title="Закрыть чат">
          <XIcon />
        </Button>
      </div>
      <div className="relative flex grow flex-col overflow-y-hidden">
        <MessageList
          messages={messages}
          isLoading={isSending}
          name={chat.name}
          botAvatarUrl={chat.image}
        />
        <form onSubmit={send} className="absolute right-0 bottom-4 left-0 mx-2 lg:mx-6">
          <Input
            value={msg}
            setValue={(value) => setMsg(value)}
            placeholder="Спроси меня что-нибудь..."
            isDisabled={isSending}
            isButtonDisabled={isSending || !msg.trim()}
            buttonIcon={<ArrowUpIcon />}
            buttonTitle="Отправить сообщение"
          />
        </form>
      </div>
    </section>
  );
}
