import Link from 'next/link';
import {ListIcon, XIcon} from '@phosphor-icons/react/ssr';
import {Button} from '@/shared/ui';

type ChatHeaderProps = {
  title: string;
  showCloseButton?: boolean;
  onOpenSidebar?: () => void;
  closeHref?: string;
};

export function ChatHeader({
  title,
  showCloseButton = false,
  onOpenSidebar,
  closeHref = '/chat/new',
}: ChatHeaderProps) {
  return (
    <div className="relative mx-6 my-6 flex items-center justify-center font-light">
      {onOpenSidebar && (
        <Button
          onClick={onOpenSidebar}
          className="absolute left-0 block md:hidden"
          title="Показать историю чатов"
        >
          <ListIcon />
        </Button>
      )}
      <h2 className="mx-12 text-center text-xl font-semibold break-words">{title}</h2>
      {showCloseButton && (
        <Button href={closeHref} className="absolute right-0 cursor-pointer" title="Закрыть чат">
          <XIcon />
        </Button>
      )}
    </div>
  );
}
