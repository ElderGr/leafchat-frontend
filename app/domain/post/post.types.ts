import { BaseQuery } from "@/app/core/types/api";

export type Post = BaseQuery & {
    id: string;
    description: string;
    title: string;
    user_id: string;
    Post_files: {
        create_at: string;
        id: string;
        link: string;
        name: string;
        post_id: string;
        updated_at: string;
    }[];
    _count: {
        Comments: number;
        Likes: number;
    }
}

export type CreatePost = {
    description: string;
    title: string;
    files: any;
}