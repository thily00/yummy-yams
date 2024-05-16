import api from './api';

export const getActiveSession = async() => {
    const response = await api.get('/game/active');
    if(response.status === 200) {
        return response.data.data;
    }
};


export const getAllSessions = async() => {
    const response = await api.get('/game');
    if(response.status === 200) {
        return response.data.data;
    }
};


export const createSession = async() => {
    const response = await api.post('/game');
    if(response.status === 201) {
        return response.data.data;
    }
};

export const closeSession = async(sessionId: string) => {
    const response = await api.patch(`/game/${sessionId}`, { status: 'finished'});
    if(response.status === 200) {
        return response.data.data;
    }
};


export const getResult = async(sessionId: string) => {
    const response = await api.get(`/game/result/${sessionId}`);
    if(response.status === 200) {
        return response.data.data;
    }
}

export const rollDice = async(sessionId: string) => {
    const response = await api.post('/game/play', { sessionId });
    if(response.status === 200) {
        return response.data;
    }
}