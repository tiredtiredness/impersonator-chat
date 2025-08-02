'use client';

import {useParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useChat} from '@/entities/chat/model';
import {useMessages} from '@/entities/message/model';
import {useSendMessage} from '@/features/send-message';
import {ChatNotFound} from '@/widgets/chat-not-found';
import {SendMessageForm} from '@/widgets/forms';
import {MessageList} from '@/widgets/message-list';
import {PHRASES, createUrlFromBlob} from '@/shared/lib';
import {useMobileMenu} from '@/shared/lib/hooks';
import {ChatHeader, Loader} from '@/shared/ui';

export function ChatPage() {
  const [phrase, setPhrase] = useState<string>('');
  const params = useParams();
  const chatId = params?.chatId as string | undefined;
  const {chat, isLoading: isLoadingChat} = useChat(chatId as string);
  const {messages, isLoading: isLoadingMessages} = useMessages(chatId as string);
  const {sendMessage, isLoading: isSending} = useSendMessage(chat?.id);

  const {setIsOpen} = useMobileMenu();

  useEffect(() => {
    const random = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    setPhrase(random);
  }, []);

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
      <ChatHeader
        title={`${chat?.name} ${phrase}`}
        onOpenSidebar={() => setIsOpen(true)}
        showCloseButton
      />
      <div className="relative flex grow flex-col overflow-y-hidden">
        <MessageList
          messages={messages}
          isLoading={isSending}
          name={chat.name}
          botAvatarUrl={createUrlFromBlob(chat.image)}
        />
        <SendMessageForm chat={chat} messages={messages} send={sendMessage} isSending={isSending} />
      </div>
    </section>
  );
}
