import {FormEvent, useState} from 'react';
import {ArrowUpIcon} from '@phosphor-icons/react/ssr';
import {TChat} from '@/entities/chat/model';
import {TApiMessage, TMessage} from '@/entities/message/model';
import {Input} from '@/shared/ui';

type SendMessageFormProps = {
  chat: TChat;
  messages: TMessage[];
  send: (chat: string, text: string, history: TApiMessage[]) => Promise<void>;
  isSending: boolean;
};

export function SendMessageForm({chat, messages, send, isSending}: SendMessageFormProps) {
  const [msg, setMsg] = useState<string>('');

  const sendForm = async (event: FormEvent) => {
    event.preventDefault();
    if (!msg.trim() || !chat) {
      return;
    }
    setMsg('');

    const formattedMessages: TApiMessage[] = messages.map((msg) => ({
      role: msg.type === 'bot' ? 'assistant' : 'user',
      content: msg.text,
    }));

    await send(chat.name, msg, formattedMessages);
  };

  return (
    <form onSubmit={sendForm} className="absolute right-0 bottom-4 left-0 mx-2 lg:mx-6">
      <Input
        value={msg}
        setValue={(value) => setMsg(value)}
        placeholder="Спроси меня что-нибудь..."
        isButtonDisabled={isSending || !msg.trim()}
        buttonIcon={<ArrowUpIcon />}
        buttonTitle="Отправить сообщение"
      />
    </form>
  );
}
