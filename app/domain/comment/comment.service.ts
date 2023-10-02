/* eslint-disable import/no-anonymous-default-export */
import axiosInstance, { SERVICE_BASE_URL, axiosMultipartData } from '@/app/config/axios';
import { Comment, CreateComment } from './comment.types';

const get_URL_CONTROLER = (postId: string) => {
    return `${SERVICE_BASE_URL}/${postId}/comments`;
}
const commentService = {
    async getCommentById(params?: any) {
        const result = await axiosInstance.get<Comment[]>(
            get_URL_CONTROLER(params.post_id),
            {
                params
            }
        )

        return result.data
    },
    async create(data: CreateComment) {
        const formData = new FormData()

        formData.append('content', data.content)

        if(data.files){
            data.files.forEach(file => {
              formData.append('image', file.originFileObj) 
            });
          }

        const result = await axiosMultipartData.post<CreateComment[]>(
            get_URL_CONTROLER(data.postId),
            formData,
            {
                headers: {
                    "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
                }
            }
        )

        return result
    }

}

export default commentService;