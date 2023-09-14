import axios from 'axios';
import { accessTokenInterceptor, multipartDataInterceptor } from './interceptors'

export const SERVICE_BASE_URL = 'http://localhost:5000'

const axiosInstance = axios.create({ baseURL: SERVICE_BASE_URL });

axiosInstance.interceptors.request.use(accessTokenInterceptor)

export const axiosMultipartData = axiosInstance
// axiosMultipartData.interceptors.request.use(multipartDataInterceptor)

export default axiosInstance;