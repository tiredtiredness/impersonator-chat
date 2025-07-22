import { mockChat } from "@/data";
import {
  ArrowLeftIcon,
  ArrowUpIcon,
  XIcon
} from "@phosphor-icons/react/dist/ssr";
import {Metadata} from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ chatId: string }>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const chatId = (await params).chatId;

  // todo: change chatId to character's name

  return {
    title: `Чат с ${chatId} | Impersonator Chat`,
    description:
      "Наслаждайся диалогом с AI, воссоздающим стиль и мышление выбранной личности. Увлекательные беседы с Эйнштейном, Маском и другими.",
  };
}

export default async function ChatPage({params}: Props) {
  const {chatId} = await params;
  return (
    <div className="m-1 flex grow flex-col rounded-4xl bg-zinc-50/50 p-1">
      <header className="mx-6 my-6 flex items-center justify-between font-light">
        <Link
          href={""}
          className="cursor-pointer rounded-full bg-zinc-100 p-3 transition-colors hover:bg-blue-500 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
        >
          <ArrowLeftIcon />
        </Link>
        <h2 className="text-3xl">Чат #{chatId}</h2>
        <Link
          href="/chat/new"
          className="cursor-pointer rounded-full bg-zinc-100 p-3 transition-colors hover:bg-blue-500 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
        >
          <XIcon />
        </Link>
      </header>
      <main className="flex grow flex-col overflow-y-hidden">
        <ul className="flex flex-col gap-6 overflow-y-auto py-2">
          {mockChat.map((msg) => (
            <li
              key={msg.id}
              className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`mx-6 rounded-4xl bg-stone-50 ${msg.role === "assistant" ? "p-10" : "p-6"} max-w-[60%]`}
              >
                <p>{msg.content}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="bg-opacity-10 mx-10 flex gap-2 rounded-full bg-zinc-200 p-1.5 backdrop-blur-sm backdrop-filter">
          <input
            placeholder="Спроси меня что-нибудь..."
            className="grow rounded-full px-2 py-1 text-gray-600 placeholder:text-xs transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
          ></input>
          <button className="-rotate-90 cursor-pointer rounded-full bg-zinc-100 p-3 transition-all ease-in-out hover:rotate-0 hover:bg-blue-500 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-blue-500">
            <ArrowUpIcon />
          </button>
        </div>
      </main>
    </div>
  );
}
