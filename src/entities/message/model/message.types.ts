export type TMessage = {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: 'bot' | 'user';
  text: string;
  chatId: string;
};
