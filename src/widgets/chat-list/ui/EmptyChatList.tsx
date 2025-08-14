import {ChatsTeardropIcon} from "@phosphor-icons/react/ssr";

export function EmptyChatList() {
  return <div className="flex grow flex-col items-center justify-center py-12 text-center select-none">
    <div className="mb-4 animate-pulse text-6xl">
      <ChatsTeardropIcon />
    </div>
    <p className="mb-2 text-lg font-semibold">История чатов пуста</p>
    <p className="max-w-xs">Начни новый чат, чтобы здесь появилась история общения.</p>
  </div>;
}