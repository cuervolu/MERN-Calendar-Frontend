import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const calendarAPi = axios.create({
    baseURL: VITE_API_URL,
});

calendarAPi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'X-Token': localStorage.getItem('token')
    }
    return config;
});

export default calendarAPi;