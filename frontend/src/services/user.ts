import api from './api';

export const getUserData = async() => {
    const response = await api.get('/user/me');
    if(response.status === 200) {
        return response.data.data;
    }
};
