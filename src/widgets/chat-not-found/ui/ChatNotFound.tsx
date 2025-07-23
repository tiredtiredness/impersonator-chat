import {Button} from "@/shared/ui";
import {
  EmptyIcon,
  ListIcon,
  UserPlusIcon,
  XIcon
} from "@phosphor-icons/react/ssr";

export function ChatNotFound({openMenu}: { openMenu: () => void }) {
  return (
    <div className="relative m-1 flex grow flex-col items-center justify-center rounded-4xl bg-zinc-50/50 p-8">
      <Button
        onClick={openMenu}
        className="absolute top-4 left-4 block md:hidden"
      >
        <ListIcon />
      </Button>
      <Button
        href="/chat/new"
        className="absolute top-5.5 right-7 cursor-pointer"
        title="Закрыть"
      >
        <XIcon />
      </Button>

      <div className="mb-4 text-6xl animate-pulse"><EmptyIcon /></div>
      <h2 className="mb-2 text-lg font-semibold">Чат не найден</h2>
      <p className="mb-6">
        Чат, который Вы ищете не существует или удален.
      </p>

      <div className="flex gap-4">
        <Button
          href="/chat/new"
          title="Начать новый чат"
        >
          <UserPlusIcon />
        </Button>
      </div>
    </div>
  );
}