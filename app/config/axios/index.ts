import axios from 'axios';

export const SERVICE_BASE_URL = 'http://localhost:5000'

const axiosInstance = axios.create({ baseURL: SERVICE_BASE_URL });

export default axiosInstance;