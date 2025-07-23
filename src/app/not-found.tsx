import {Button} from '@/shared/ui/button/Button';
import {ListIcon, UserPlusIcon} from '@phosphor-icons/react/ssr';

export default function NotFound() {
  return (
    <div className="m-1 flex h-dvh grow flex-col rounded-4xl bg-zinc-50/50 p-1">
      <header className="relative mx-6 my-6 flex items-center justify-center font-light">
        <Button
          href={'/chat'}
          className="absolute left-0 block md:hidden"
          title="Вернуться к истории чатов"
        >
          <ListIcon />
        </Button>
      </header>
      <main className="mx-6 flex grow flex-col justify-center gap-6 rounded-4xl text-center lg:mx-10">
        <h1 className="sr-only">Страница не найдена</h1>
        <div className="text-7xl">404</div>
        <h2 className="text-xl font-bold">
          Извините, запрашиваемая страница не существует или была удалена.
        </h2>
        <p className="text-sm text-gray-500">
          Попробуйте вернуться к истории чатов или создать новый чат.
        </p>
        <Button href={'/chat/new'} className="mx-auto" title="Создать новый чат">
          <UserPlusIcon />
        </Button>
      </main>
    </div>
  );
}
