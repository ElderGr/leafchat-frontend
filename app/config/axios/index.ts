import axios from 'axios';
import { accessTokenInterceptor } from './interceptors'

export const SERVICE_BASE_URL = 'http://localhost:5000'

const axiosInstance = axios.create({ baseURL: SERVICE_BASE_URL });

axiosInstance.interceptors.request.use(accessTokenInterceptor)

export default axiosInstance;