import {useCallback, useState} from 'react';
import {chatsTable} from "@/entities/chat/model";
import {messagesTable} from "@/entities/message/model";

export const useDeleteChat = () => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const deleteChat = useCallback(
    async function (chatId: string) {
      try {
        chatsTable.delete(chatId).then(()=>{
          messagesTable.filter(msg=>msg.chatId === chatId).delete()
        })
      } catch (error) {
        console.error(`Failed to delete chat: ${error}`);
        setIsDeleting(false);
      } finally {
        setIsDeleting(false);
      }
    },
    [setIsDeleting],
  );

  return {deleteChat, isDeleting};
};
