import {ArrowUpIcon} from "@phosphor-icons/react/dist/ssr";
import {Metadata, ResolvingMetadata} from "next";

type Props = {
  params: Promise<{ chatId: string }>;
};

export async function generateMetadata(
  {params}: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
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
    <div className="flex grow flex-col p-1">
      <div className="flex items-center justify-center font-light">
        Чат #{chatId}
      </div>
      <div className=" rounded-full flex gap-2 p-1.5">
        <input
          placeholder="Спроси меня что-нибудь..."
          className="grow rounded-full px-2 py-1 text-gray-600 placeholder:text-xs focus-visible:ring-fuchsia-800"
        ></input>
        <button className="-rotate-90 cursor-pointer rounded-full bg-zinc-100 p-3 transition-transform ease-in-out hover:rotate-0">
          <ArrowUpIcon />
        </button>
      </div>
    </div>
  );
}
