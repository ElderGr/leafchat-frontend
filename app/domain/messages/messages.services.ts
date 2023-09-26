/* eslint-disable import/no-anonymous-default-export */
import axiosInstance, { SERVICE_BASE_URL } from '@/app/config/axios';
import { MessagesModel, CreateMessage} from './messages.types';

const URL_CONTROLER = `${SERVICE_BASE_URL}/message`;

const messagesService = {
  async create({
    chatId,
    content,
    contentType,
    owner
  }: CreateMessage){

    const formData = new FormData()

    formData.append('chatId', chatId)
    formData.append('contentType', contentType)
    formData.append('owner', owner)

    if(contentType !== 'text'){
      formData.append('audio', content)
    } else {
      formData.append('content', content)
    }

    const result = await axiosInstance.post<MessagesModel>(
      `${URL_CONTROLER}`,
      formData,
      {
        headers: {
					"content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
				}
      }
  )

    return result
  }
};

export default messagesService