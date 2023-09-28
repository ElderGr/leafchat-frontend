export type ChatsModel = {
    id: string;
    created_at: Date;
    participants: string[];
}

export type CreateChatDto = {
    owner: string;
    participants: string[];
    content: any;
    contentType: string;
  };