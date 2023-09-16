import { BaseQuery } from "@/app/core/types/api";

export type Comment = BaseQuery & {
    id: string;
    body: string;
    post_id: string;
    user_id: string;
    User: {
        name: string;
        avatar_url: string;
        email: string;

    }
}