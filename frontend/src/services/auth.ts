import api from './api';

interface RegisterBody {
    name: string;
    email: string;
    password: string;
}

interface LoginBody {
    email: string;
    password: string;
}


export const registerUser = async(data: RegisterBody) => {
    const response = await api.post('/register', data);
    if(response.status === 201) {
        return response.data.data;
    }
};

export const loginUser = async(data: LoginBody) => {
    const response = await api.post('/login', data);
    if (response.status === 200) {
        return response.data.data;
    }
};