/* eslint-disable import/no-anonymous-default-export */
import axiosInstance, { SERVICE_BASE_URL, axiosMultipartData } from '@/app/config/axios';
import { Comment } from './comment.types';

const get_URL_CONTROLER = (postId: string) => {
    return `${SERVICE_BASE_URL}/${postId}/comments`;
}
const commentService = {
    async getCommentById(params?: any){
        const result = await axiosInstance.get<Comment[]>(
            get_URL_CONTROLER(params.post_id),
            {
                params
            }
        )
    
        return result.data
      },

}

export default commentService;