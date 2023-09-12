import { BaseQuery } from "@/app/core/types/api";

export type Post = BaseQuery & {
    id: string;
    description: string;
    title: string;
    user_id: string;
    Post_files: string[];
    _count: {
        Comments: number;
        Likes: number;
    }
}