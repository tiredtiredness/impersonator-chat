import {Metadata} from 'next';
import {ChatPage} from '@/components/pages/ChatPage';

export async function generateMetadata({params}: {params: {chatId: string}}): Promise<Metadata> {
  return {
    title: `Чат с имперсонатором | Impersonator Chat`,
    description:
      'Наслаждайся диалогом с AI, воссоздающим стиль и мышление выбранной личности. Увлекательные беседы с Эйнштейном, Маском и другими.',
  };
}

export default function Page() {
  return <ChatPage />;
}
