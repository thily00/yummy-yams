import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import {store} from '../store'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const url = config.url;

        if (url?.includes('/login') || url?.includes('/register')) {
            return config; 
        }

        const state = store.getState();
        const token = state.auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            store.dispatch({ type: 'auth/logout' });
            store.dispatch({ type: 'game/clearSession' });
        }
        return Promise.reject(error);
    }
);

export default api;