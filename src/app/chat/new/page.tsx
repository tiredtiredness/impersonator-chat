"use client";

import {Metadata} from "next";
import Image from "next/image";
import {UserPlusIcon} from "@phosphor-icons/react/dist/ssr";
import {useRouter} from "next/navigation";
import {useChat} from "@/hooks/useChat";

// todo: add new chat page metadata

// export const metadata: Metadata = {
//   title: "Новый чат | Impersonator Chat",
//   description:
//     "Выбери историческую личность или вымышленного героя и начни уникальный разговор с AI в стиле этой персоны.",
// };

export default function NewChatPage() {
  const router = useRouter();
  const {createChat, isLoading} = useChat();
  const create = async (event) => {
    event.preventDefault();
    const name: string = event.target.name.value;
    if (!name.trim()) {
      return;
    }
    const chat = await createChat(name);
    router.push(`/chat/${chat?.id}`);
  };

  return (
    <div className="m-1 flex grow flex-col rounded-4xl bg-zinc-50/50 p-1">
      <header className="mx-6 my-6 flex items-center justify-center font-light">
        <h2 className="text-3xl">Новый чат</h2>
      </header>
      <main className="flex grow flex-col justify-center gap-6 rounded-4xl">
        <div className="mx-10 flex items-center gap-6">
          <Image
            src="/impersonator.webp"
            alt="Head of impersonator"
            width={80}
            height={80}
            className="-scale-x-100 rounded-full"
          />
          <div>
            <h2 className="text-xl">Привет, Максим!</h2>
            <p className="text-xl font-bold">С кем хочешь пообщаться?</p>
          </div>
        </div>
        <form
          onSubmit={create}
          className="bg-opacity-10 bg-opacity-25 mx-6 flex gap-2 rounded-full bg-neutral-200/50 p-1.5 shadow shadow-gray-300/50 backdrop-blur-lg backdrop-filter"
        >
          <input
            name="name"
            id="name"
            placeholder="Например, Альберт Эйнштейн"
            className="grow rounded-full px-2 py-1 text-gray-600  placeholder:text-xs focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
          ></input>
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-zinc-100 p-3  hover:bg-blue-500 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
          >
            <UserPlusIcon />
          </button>
        </form>
      </main>
    </div>
  );
}
