/* eslint-disable import/no-anonymous-default-export */
import axiosInstance, { SERVICE_BASE_URL } from '@/app/config/axios';
import { Post } from './post.types';

const URL_CONTROLER = `${SERVICE_BASE_URL}/posts`;

const postsService = {
  async findMany(params?: any){
    const result = await axiosInstance.get<Post[]>(
        `${URL_CONTROLER}`,
        {
            params
        }
    )

    return result.data
  },
};

export default postsService