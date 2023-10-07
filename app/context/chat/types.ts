import { ReactNode } from "react";

export interface ChatProviderProps {
    children: ReactNode;
  }
  
export interface ChatContextProps {
    selectedChat: SelectedChat | null;
    handleSelectChat(chat: SelectedChat): void;
    handleCloseChat(): void;
}

export type SelectedChat = {
    id?: string;
    participants?: string[];
}