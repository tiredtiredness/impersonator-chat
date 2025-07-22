import Image from 'next/image';
import Markdown from 'react-markdown';
import {TMessage} from '@/types';

type MessageProps = TMessage & {};

export function Message({text, createdAt, type}: MessageProps) {
  return (
    <div className={`flex ${type === 'bot' ? 'justify-start' : 'justify-end'}`}>
      <div className="mx-6 flex max-w-[80%] items-start gap-6 space-y-1 lg:max-w-[60%]">
        {type === 'bot' && (
          <Image
            src={'/impersonator.webp'}
            alt={'impersonator head'}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div>
          <div className={`w-full rounded-4xl bg-stone-50 ${type === 'bot' ? 'p-10' : 'p-6'} `}>
            <Markdown>{text}</Markdown>
          </div>
          <time className="text-xs text-gray-600">{new Date(createdAt).toLocaleString('ru')}</time>
        </div>
      </div>
    </div>
  );
}
