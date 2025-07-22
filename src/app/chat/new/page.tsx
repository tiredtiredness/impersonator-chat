import {Metadata} from "next";
import Image from "next/image";
import {UserPlusIcon} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Новый чат | Impersonator Chat",
  description:
    "Выбери историческую личность или вымышленного героя и начни уникальный разговор с AI в стиле этой персоны.",
};

export default function NewChatPage() {
  return (
    <div className="m-1 flex grow flex-col rounded-4xl bg-zinc-50/50 p-1">
      <header className="mx-6 my-6 flex items-center justify-center font-light">
        <h2 className="text-3xl">Новый чат</h2>
      </header>
      <main className="flex grow flex-col rounded-4xl justify-center gap-6">
        <div className="mx-10 flex gap-6 items-center">
          <Image
            src="/impersonator.webp"
            alt="Head of impersonator"
            width={80}
            height={80}
            className="rounded-full -scale-x-100"
          />
          <div>
            <h2 className="text-xl">Привет, Максим!</h2>
            <p className="font-bold text-xl">С кем хочешь пообщаться?</p>
          </div>
        </div>
        <div className="bg-opacity-10 mx-10 flex gap-2 rounded-full bg-zinc-200 p-1.5 backdrop-blur-sm backdrop-filter">
          <input
            placeholder="Например, Альберт Эйнштейн"
            className="grow rounded-full px-2 py-1 text-gray-600 placeholder:text-xs transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
          ></input>
          <button className="cursor-pointer rounded-full bg-zinc-100 p-3 transition-colors hover:bg-blue-500 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-blue-500">
            <UserPlusIcon />
          </button>
        </div>
      </main>
    </div>

  );
}
