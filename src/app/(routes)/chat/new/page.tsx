import {NewChatPage} from '@/page-components/new-chat/ui';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Новый чат | Impersonator Chat',
  description:
    'Выбери историческую личность или вымышленного героя и начни уникальный разговор с AI в стиле этой персоны.',
};

export default function Page() {
  return <NewChatPage />;
}
