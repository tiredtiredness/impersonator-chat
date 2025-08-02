import {useRouter} from 'next/navigation';
import {FormEvent, useState} from 'react';
import {UserPlusIcon} from '@phosphor-icons/react/ssr';
import {useCreateChat} from '@/features/create-chat';
import {validateName} from '@/shared/lib';
import {Input} from '@/shared/ui';

export function CreateChatForm() {
  const router = useRouter();
  const {createChat, isLoading} = useCreateChat();
  const [name, setName] = useState<string>('');
  const [error, setError] = useState('');

  const create = async (event: FormEvent) => {
    event.preventDefault();
    const nameError = validateName(name);
    if (nameError) {
      setError(nameError);
      return;
    }
    setError('');
    const newChat = await createChat(name);
    if (newChat?.id) {
      router.push(`/chat/${newChat.id}`);
    }
  };

  return (
    <form onSubmit={create}>
      <label htmlFor="chat-name" className="sr-only">
        Имя персонажа
      </label>
      <Input
        id="chat-name"
        value={name}
        setValue={setName}
        placeholder="Например, Альберт Эйнштейн"
        isDisabled={isLoading}
        isButtonDisabled={isLoading}
        buttonIcon={<UserPlusIcon />}
        buttonTitle="Создать чат"
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </form>
  );
}
