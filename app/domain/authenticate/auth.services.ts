/* eslint-disable import/no-anonymous-default-export */
import axiosInstance, { SERVICE_BASE_URL } from '@/app/config/axios';
import { AuthResponse, IAuthData } from './auth.types';

const URL_CONTROLER = `${SERVICE_BASE_URL}/auth`;

const authenticateService = {
  async signIn({
    email,
    password
  }: IAuthData) {
    const result = await axiosInstance.post<AuthResponse>(
      `${URL_CONTROLER}/sign-in`,
      {
        email,
        password
      }
    );

    return result.data;
  },
};

export default authenticateService