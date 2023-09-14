/* eslint-disable import/no-anonymous-default-export */
import axiosInstance, { SERVICE_BASE_URL, axiosMultipartData } from '@/app/config/axios';
import { Post, CreatePost} from './post.types';

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
  async addLike(id: string){
    const result = await axiosInstance.post<void>(
        `${URL_CONTROLER}/${id}/like`
    )

    return result.data
  },
  async create(data: CreatePost){

    const formData = new FormData()

    formData.append('description', data.description)
    formData.append('title', data.title)
    console.log(formData)
    
    data.files.forEach(file => {
      formData.append('image', file.originFileObj) 
    });

    const result = await axiosMultipartData.post<Post>(
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

export default postsService