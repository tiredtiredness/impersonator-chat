import {HeadCircuitIcon} from '@phosphor-icons/react/ssr';

export function EmptyChat() {
  return (
    <div className="flex grow flex-col items-center justify-center py-16 text-center select-none">
      <div className="mb-4 animate-pulse text-6xl">
        <HeadCircuitIcon />
      </div>
      <p className="mb-2 text-lg font-semibold">Пока тут пусто...</p>
      <p className="mb-6 max-w-xs">Отправь первое сообщение, чтобы начать разговор с имитатором!</p>
    </div>
  );
}
