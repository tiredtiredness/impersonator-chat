import {TMessage} from '@/entities/message/model';
import {MarkdownText} from '@/entities/message/ui/MarkdownText';
import {MessageTimestamp} from '@/entities/message/ui/MessageTimestamp';
import {Avatar} from '@/entities/message/ui/Avatar';

type MessageProps = TMessage;

export function Message({text, createdAt, type}: MessageProps) {
  const isBot = type === 'bot';
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className="mx-2 flex max-w-[90%] items-start gap-2 space-y-1 lg:mx-6 lg:max-w-[60%] lg:gap-6">
        {isBot && <Avatar />}
        <div className="flex flex-col gap-1.5">
          <div
            className={`w-full rounded-4xl bg-stone-50 wrap-anywhere ${isBot ? 'p-6 lg:p-10' : 'p-4 lg:p-6'} `}
          >
            <MarkdownText>{text}</MarkdownText>
          </div>
          <MessageTimestamp createdAt={createdAt} isAlignedLeft={isBot} />
        </div>
      </div>
    </div>
  );
}
