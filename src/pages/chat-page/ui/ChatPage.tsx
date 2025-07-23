"use client";

import {FormEvent, useEffect, useRef, useState} from "react";
import {useParams} from "next/navigation";
import {useChat} from "@/entities/chat/model/useChat";
import {useMessages} from "@/entities/message/model/useMessages";
import {
  ArrowUpIcon,
  ListIcon,
  UserPlusIcon,
  XIcon
} from "@phosphor-icons/react/ssr";
import {useMobileMenu} from "@/shared/hooks/useMobileMenu";
import {Input} from "@/shared/ui/input/Input";
import {Message} from "@/entities/message/ui/Message";
import {Button} from "@/shared/ui/button/Button";
import {Loader} from "@/shared/ui/loader/Loader";
import {PHRASES} from "@/shared/lib";

export function ChatPage() {
  const [msg, setMsg] = useState<string>("");
  const [phrase, setPhrase] = useState<string>("");
  const params = useParams();
  const chatId = params?.chatId as string | undefined;
  const {chat} = useChat(chatId as string);
  const {messages, sendMessage, isLoading} = useMessages(chatId as string);
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
    setMsg("");
    await sendMessage(chat.name, msg);
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!messages) return null;

  if (!chat || !chatId) {
    return (
      <div className="relative m-1 flex grow flex-col items-center justify-center rounded-4xl bg-zinc-50/50 p-8">
        <Button
          onClick={() => setIsOpen(true)}
          className="absolute top-4 left-4 block md:hidden"
        >
          <ListIcon />
        </Button>
        <Button
          href="/chat/new"
          className="absolute top-4 right-4 cursor-pointer"
          title="Закрыть"
        >
          <XIcon />
        </Button>

        <h2 className="text-xl font-semibold mb-4">Чат не найден</h2>
        <p className="text-gray-600 mb-6 text-center">
          Чат, который Вы ищете не существует или удален.
        </p>
        <div className="flex gap-4">
          <Button
            href="/chat/new"
            title="Начать новый чат"
          >
            <UserPlusIcon />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="m-1 flex grow flex-col rounded-4xl bg-zinc-50/50 p-1">
      <header className="relative mx-6 my-6 flex items-center justify-center font-light">
        <Button
          onClick={() => setIsOpen(true)}
          className="absolute left-0 block md:hidden"
          title="Показать историю чатов"
        >
          <ListIcon />
        </Button>
        <h2 className="text-xl font-semibold mx-12 text-center text-wrap break-all break-after-all ">{chat?.name} {phrase}</h2>
        <Button
          href="/chat/new"
          className="absolute right-0 cursor-pointer"
          title="Закрыть чат"
        >
          <XIcon />
        </Button>
      </header>
      <main className="relative flex grow flex-col overflow-y-hidden">
        <ul className="flex flex-col gap-6 overflow-y-auto py-2 pb-16">
          {messages?.map((msg) => (
            <li key={msg.id}>
              <Message {...msg} />
            </li>
          ))}
          <div ref={messagesEndRef}></div>
          {isLoading && <Loader width={24} />}
        </ul>
        <form
          onSubmit={send}
          className="mx-2 lg:mx-6 absolute right-0 bottom-4 left-0"
        >
          <Input
            value={msg}
            setValue={(value) => setMsg(value)}
            placeholder="Спроси меня что-нибудь..."
            isDisabled={isLoading}
            isButtonDisabled={isLoading || !msg.trim()}
            buttonIcon={<ArrowUpIcon />}
            buttonTitle="Отправить сообщение"
          />
        </form>
      </main>
    </div>
  );
}
