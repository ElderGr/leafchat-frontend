export type ChatsModel = {
    id: string;
    created_at: Date;
    participants: string[];
}

export type CreateChatDto = {
    participants: string[];
  };

export type FindAllChatsDto = {
    participants?: string[]
}
  