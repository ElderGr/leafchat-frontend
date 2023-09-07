import { BaseQuery } from "@/app/core/types/api";

export type User = BaseQuery & {
    id: string;
    name: string;
    avatar_url: string;
    roles: string;
    email: string;
    password: string;
}


