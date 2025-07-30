import {Avatar} from '@/entities/message/ui/Avatar';
import {Loader} from '@/shared/ui';

export function TypingMessage({name, botAvatarUrl}: {name: string; botAvatarUrl?: string}) {
  return (
    <div className="mx-2 flex w-[90%] items-start gap-2 space-y-1 lg:mx-6 lg:w-[60%] lg:gap-6">
      <Avatar url={botAvatarUrl} />
      <div className="flex grow flex-col gap-1.5">
        <div className={`w-full rounded-4xl bg-stone-50 px-6 py-2.5 wrap-anywhere lg:p-10`}>
          <span className="inline-flex items-center gap-2">
            {name} печатает <Loader className="pt-0.5" width={24} />
          </span>
        </div>
      </div>
    </div>
  );
}
