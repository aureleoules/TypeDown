import axios from 'axios';
import config from '../config';

const axiosInstance = axios.create({
    baseURL: config.API_ENDPOINT,
    headers: {
        'Authorization': localStorage.jwtToken || ''
    }
});

export default axiosInstance;