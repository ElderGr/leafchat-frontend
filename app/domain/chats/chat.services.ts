/* eslint-disable import/no-anonymous-default-export */
import axiosInstance, { SERVICE_BASE_URL } from '@/app/config/axios';
import { CreateChatDto, ChatsModel, FindAllChatsDto} from './chats.types';
import { MountQueryParamsParams } from '@/app/config/axios/query';

const URL_CONTROLER = `${SERVICE_BASE_URL}/chat`;

const chatService = {
  async create(body: CreateChatDto){

    const result = await axiosInstance.post<ChatsModel>(
      `${URL_CONTROLER}`,
      body,
    )

    return result
  },
  async findAll(params: FindAllChatsDto){

    const paramString = MountQueryParamsParams({
      params
    })

    const result = await axiosInstance.get<ChatsModel[]>(
      `${URL_CONTROLER}?${paramString}`,
    )

    return result
  }
};

export default chatService