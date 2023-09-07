/* eslint-disable import/no-anonymous-default-export */
import axiosInstance, { SERVICE_BASE_URL } from '@/app/config/axios';
import { CreateUserResponse, CreateUsersParams, User } from './user.types';

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
    console.log(result)
    return result.data;
  },
  async findMany(params?: any){
    const result = await axiosInstance.get(
        `${URL_CONTROLER}`,
        {
            params
        }
    )

    return result.data
  }
};

export default usersService