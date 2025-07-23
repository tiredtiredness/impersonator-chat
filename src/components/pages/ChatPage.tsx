"use client";

import {FormEvent, useEffect, useRef, useState} from "react";
import {useParams} from "next/navigation";
import {useChat} from "@/hooks/useChat";
import {useMessages} from "@/hooks/useMessages";
import {ArrowUpIcon, ListIcon, XIcon} from "@phosphor-icons/react/ssr";
import {useMobileMenu} from "@/hooks/useMobileMenu";
import {Input} from "@/components/ui/Input";
import {Message} from "@/components/ui/Message";
import {Button} from "@/components/ui/Button";
import {Loader} from "@/components/ui/Loader";
import {PHRASES} from "@/data";

export function ChatPage() {
  const [msg, setMsg] = useState<string>("");
  const [phrase, setPhrase] = useState<string>("");
  const {chatId} = useParams();
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

  return (
    <div className="m-1 flex grow flex-col rounded-4xl bg-zinc-50/50 p-1">
      <header className="relative mx-6 my-6 flex items-center justify-center font-light">
        <Button
          onClick={() => setIsOpen(true)}
          className="absolute left-0 block md:hidden"
        >
          <ListIcon />
        </Button>
        <h2 className="text-xl font-semibold mx-12 text-center text-wrap break-all break-after-all ">{chat?.name} {phrase}</h2>
        <Button
          href="/chat/new"
          className="absolute right-0 cursor-pointer"
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
          className="absolute right-0 bottom-4 left-0"
        >
          <Input
            value={msg}
            setValue={(value) => setMsg(value)}
            placeholder="Спроси меня что-нибудь..."
            isDisabled={isLoading}
            isButtonDisabled={isLoading || !msg.trim()}
            buttonIcon={<ArrowUpIcon />}
          />
        </form>
      </main>
    </div>
  );
}
