/* eslint-disable import/no-anonymous-default-export */
import axiosInstance, { SERVICE_BASE_URL } from '@/app/config/axios';
import { MessagesModel, CreateMessage} from './messages.types';
import { MountQueryParamsParams } from '@/app/config/axios/query';

const URL_CONTROLER = `${SERVICE_BASE_URL}/message`;

const messagesService = {
  async create({
    chatId,
    content,
    contentType,
    owner
  }: CreateMessage){
    const headers: any = {
      "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s',
    }

    const formData = new FormData()

    if(chatId){
      formData.append('chatId', chatId)
    }
    formData.append('contentType', contentType)
    formData.append('owner', owner)

    if(contentType === 'audio'){
      // headers['Content-Length'] = 64656927
      // headers['Accept-Ranges'] = 'bytes'
      // headers['Content-Range'] = 'bytes 100-64656926/*'

      formData.append('audio', content)
    } else {
      formData.append('content', content)
    }

    const result = await axiosInstance.post<MessagesModel>(
      `${URL_CONTROLER}`,
      formData,
      { headers }
  )

    return result
  },
  async findMany(params: any){
    const paramString = MountQueryParamsParams({
      params
    })

    const result = await axiosInstance.get<MessagesModel[]>(
      `${URL_CONTROLER}?${paramString}`,
    )

    return result 
  }
};

export default messagesService