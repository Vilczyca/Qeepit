import axios from 'axios';
import { getApiUrl } from '../config/apiConfig';

let tokenGetter = () => null; // domyślna funkcja

export const setTokenGetter = (getterFn) => {
    tokenGetter = getterFn;
};

const api = axios.create();

api.interceptors.request.use(async (config) => {
    config.baseURL = getApiUrl();

    const token = await tokenGetter();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

export default api;
