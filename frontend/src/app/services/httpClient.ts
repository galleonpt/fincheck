import axios from 'axios';
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '../config/localStorageKeys';

const httpClient = axios.create({
    baseURL: 'http://localhost:3000',
});

httpClient.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

export default httpClient;
