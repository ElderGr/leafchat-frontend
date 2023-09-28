/* eslint-disable import/no-anonymous-default-export */
import axiosInstance, { SERVICE_BASE_URL } from '@/app/config/axios';
import { CreateUserResponse, CreateUsersParams, EditUsersParams, User } from './user.types';

const URL_CONTROLER = `${SERVICE_BASE_URL}/users`;

const usersService = {
  async create({
    avatar_url,
    email,
    name,
    password,
    roles
  }: CreateUsersParams) {
    const result = await axiosInstance.post<CreateUserResponse>(
      `${URL_CONTROLER}`,
      {
        avatar_url,
        email,
        name,
        password,
        roles
      }
    );
    return result.data;
  },
  async findMany(params?: any){
    const result = await axiosInstance.get<User[]>(
        `${URL_CONTROLER}`,
        {
            params
        }
    )

    return result.data
  },
  async edit({
    id,
    avatar_url,
    email,
    name,
    password,
    roles
  }: EditUsersParams) {
    const result = await axiosInstance.put<CreateUserResponse>(
      `${URL_CONTROLER}/${id}`,
      {
        avatar_url,
        email,
        name,
        password,
        roles
      }
    );
    return result.data;
  },
  async remove(id: string){
    const result = await axiosInstance.delete(
      `${URL_CONTROLER}/${id}`
    )

    return result.data
  }
};

export default usersService