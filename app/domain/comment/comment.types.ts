import { BaseQuery } from "@/app/core/types/api";

export type Comment = BaseQuery & {
    id: string;
    body: string;
    post_id: string;
    user_id: string;
    Comments_files: any
    User: {
        name: string;
        avatar_url: string;
        email: string;

    }
}
export type CreateComment = {
    content: string;
    postId: string;
    userId: string;
    files: any;
}