'use client';

import {useEffect, useRef} from 'react';
import {TMessage} from '@/entities/message/model';
import {Message} from '@/entities/message/ui/Message';
import {TypingMessage} from '@/entities/message/ui/TypingMessage';
import {EmptyChat} from '@/widgets/empty-chat/ui/EmptyChat';

export function MessageList({
  messages,
  name,
  isLoading,
  botAvatarUrl,
}: {
  name: string;
  messages: TMessage[];
  isLoading: boolean;
  botAvatarUrl?: string;
}) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!messages.length) {
    return <EmptyChat />;
  }

  return (
    <ul className="flex flex-col gap-6 overflow-y-auto py-2 pb-16">
      {messages.map((msg) => (
        <li key={msg.id}>
          <Message {...msg} botAvatarUrl={botAvatarUrl} />
        </li>
      ))}

      {isLoading && <TypingMessage name={name} botAvatarUrl={botAvatarUrl} />}

      <div ref={messagesEndRef}></div>
    </ul>
  );
}
