/* eslint-disable import/no-anonymous-default-export */
import axiosInstance, { SERVICE_BASE_URL } from '@/app/config/axios';
import { CreateChatDto, ChatsModel} from './chats.types';

const URL_CONTROLER = `${SERVICE_BASE_URL}/chat`;

const messagesService = {
  async create({
    content,
    contentType,
    owner,
    participants
  }: CreateChatDto){

    const formData = new FormData()

    formData.append('contentType', contentType)
    formData.append('owner', owner)

    if(contentType !== 'text'){
      formData.append('audio', content)
    } else {
      formData.append('content', content)
    }

    formData.append('participants', participants.toString())

    const result = await axiosInstance.post<ChatsModel>(
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