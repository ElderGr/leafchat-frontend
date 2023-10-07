import { BaseQuery } from "@/app/core/types/api";

export type User = BaseQuery & {
    id: string;
    name: string;
    avatar_url: string;
    roles: string;
    email: string;
    password: string;
}

export type CreateUsersParams = Omit<User, 'id' | 'updated_at' | 'create_at'>
export type EditUsersParams = Omit<User, 'updated_at' | 'create_at'>

export type CreateUserResponse = User

export type FindAllUsersParams = {
    id?: string[]
}