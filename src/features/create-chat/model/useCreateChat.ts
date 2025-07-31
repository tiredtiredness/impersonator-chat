import {v4 as uuidv4} from 'uuid';
import {useCallback, useState} from 'react';
import {TChat, chatsTable} from '@/entities/chat/model';
import {generateImage} from '@/features/create-chat/api';
import {useImageGeneration} from '@/shared/lib';

export const useCreateChat = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {setIsImageGenerating} = useImageGeneration();

  const createChat = useCallback(
    async function (name: string) {
      setIsLoading(true);
      setIsImageGenerating(true);
      const now = new Date().toISOString();

      const newChat: TChat = {
        id: uuidv4(),
        createdAt: now,
        updatedAt: now,
        name,
        image: undefined,
      };

      try {
        await chatsTable.add(newChat);

        generateImage(name)
          .then(async (imageUrl) => {
            await chatsTable.update(newChat.id, {
              image: imageUrl,
              updatedAt: new Date().toISOString(),
            });
          })
          .catch((err) => {
            console.error('Error generating image:', err);
          })
          .finally(() => {
            setIsImageGenerating(false);
          });

        return newChat;
      } catch (error) {
        console.error(`Failed to create chat: ${error}`);
        setIsImageGenerating(false);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsImageGenerating],
  );

  return {createChat, isLoading};
};
