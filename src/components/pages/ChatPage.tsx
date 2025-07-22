'use client';

import {FormEvent, useEffect, useRef, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {useChat} from '@/hooks/useChat';
import {useMessages} from '@/hooks/useMessages';
import {ArrowLeftIcon, ArrowUpIcon, XIcon} from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import Image from 'next/image';
import Markdown from 'react-markdown';

export function ChatPage() {
  const [msg, setMsg] = useState<string>('');
  const {chatId} = useParams();
  const {chat} = useChat(chatId as string);
  const {messages, sendMessage, isLoading} = useMessages(chatId as string);

  const router = useRouter();

  const send = async (event: FormEvent) => {
    event.preventDefault();
    if (!msg.trim() || !chat) {
      return;
    }
    setMsg('');
    await sendMessage(chat.name, msg);
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!messages) return null;

  return (
    <div className="m-1 flex grow flex-col rounded-4xl bg-zinc-50/50 p-1">
      <header className="mx-6 my-6 flex items-center justify-between font-light">
        <button
          onClick={() => router.back()}
          className="cursor-pointer rounded-full bg-neutral-100 p-3 hover:bg-blue-500 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
        >
          <ArrowLeftIcon />
        </button>
        <h2 className="text-3xl">Чат с {chat?.name}</h2>
        <Link
          href="/chat/new"
          className="cursor-pointer rounded-full bg-neutral-100 p-3 hover:bg-blue-500 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
        >
          <XIcon />
        </Link>
      </header>
      <main className="relative flex grow flex-col overflow-y-hidden">
        <ul className="flex flex-col gap-6 overflow-y-auto py-2 pb-19">
          {messages?.map((msg) => (
            <li
              key={msg.id}
              className={`flex ${msg.type === 'bot' ? 'justify-start' : 'justify-end'}`}
            >
              <div className="mx-6 flex max-w-[60%] items-start gap-6 space-y-1">
                {msg.type === 'bot' && (
                  <Image
                    src={'/impersonator.webp'}
                    alt={'impersonator head'}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <div
                    className={`w-full rounded-4xl bg-stone-50 ${msg.type === 'bot' ? 'p-10' : 'p-6'} `}
                  >
                    <Markdown>{msg.text}</Markdown>
                  </div>
                  <time className="text-xs text-gray-600">
                    {new Date(msg.createdAt).toLocaleString('ru')}
                  </time>
                </div>
              </div>
              <div ref={messagesEndRef}></div>
            </li>
          ))}
        </ul>
        <form
          onSubmit={send}
          className="bg-opacity-10 bg-opacity-25 absolute right-0 bottom-4 left-0 mx-6 flex gap-2 rounded-full bg-zinc-200/50 p-1.5 backdrop-blur-lg backdrop-filter"
        >
          <input
            disabled={isLoading}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Спроси меня что-нибудь..."
            className="grow rounded-full px-2 py-1 text-gray-600 placeholder:text-xs focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
          ></input>
          <button
            type="submit"
            disabled={isLoading || !msg.trim()}
            className="-rotate-90 cursor-pointer rounded-full bg-neutral-100 p-3 transition-transform hover:rotate-0  enabled:hover:bg-blue-500 enabled:hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 disabled:cursor-not-allowed"
          >
            <ArrowUpIcon />
          </button>
        </form>
      </main>
    </div>
  );
}
