import { Post } from "@/app/domain/post/post.types";
import { ReactNode } from "react";

export interface PostProviderProps {
    children: ReactNode;
  }
  
export interface PostContextProps {
    selectedPost: Post | null;
    newPostForm: boolean;
    commentsOnPost: boolean;
    openNewPostForm(): void;
    closeNewPostForm(): void;
    openCommentsOnForm(post: Post): void;
    closeCommentsOnForm(): void;
}

  