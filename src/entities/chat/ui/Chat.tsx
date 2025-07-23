'use client';

import {Message} from '@/entities/message/ui/Message';
import {TMessage} from '@/entities/message/model';
import {useEffect, useRef} from 'react';
import {EmptyChat} from '@/widgets/empty-chat/ui/EmptyChat';
import {TypingMessage} from '@/entities/message/ui/TypingMessage';

export function Chat({
  messages,
  name,
  isLoading,
}: {
  name: string;
  messages: TMessage[];
  isLoading: boolean;
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
          <Message {...msg} />
        </li>
      ))}

      {isLoading && <TypingMessage name={name} />}

      <div ref={messagesEndRef}></div>
    </ul>
  );
}
