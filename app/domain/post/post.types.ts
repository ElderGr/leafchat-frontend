import { BaseQuery } from "@/app/core/types/api";

export type Post = BaseQuery & {
    id: string;
    description: string;
    title: string;
    user_id: string;
    image: null
}