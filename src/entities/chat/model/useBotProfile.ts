import {useLiveQuery} from "dexie-react-hooks";
import {TChat, chatsTable} from "@/entities/chat/model";
import {createUrlFromBlob} from "@/shared/lib";

export const useBotProfile = (chatId?: string) => {
  const chat =
    useLiveQuery<TChat | null>(() => {
      if (!chatId) {
        return null;
      }
      return chatsTable.where({id: chatId}).first();
    }, [chatId]) ?? null;

  const url = createUrlFromBlob(chat?.image);
  const name = chat?.name
  return {url, name};
};
