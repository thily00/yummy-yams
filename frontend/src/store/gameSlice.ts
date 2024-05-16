// src/store/gameSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface session {
    _id: string;
    name: string;
    status: string;
}

interface activeSession {
    sessions: [];
    session: session;
    attempts: number;
    win: boolean;
    rewardName: string | null;
}

interface GameSession {
    sessions: session[];
    session: null | activeSession;
}

interface IUpdateUserSession {
    attempts: number;
    win: boolean;
    reward: string | null;
}

const initialState: GameSession = {
    sessions: [],
    session: null
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {

    setSession(state, action: PayloadAction<activeSession>) {
        const session = state.session;
        console.log('session', action.payload);
        
        if (session) {
            session.attempts = action.payload.attempts;
            session.win = action.payload.win;
            session.rewardName = action.payload.rewardName ? action.payload.rewardName : null;
        }else{
            state.session = action.payload;
        }
    },

    setSessions(state, action: PayloadAction<session[]>) {
        state.sessions = action.payload;
    },

    updateUserSession(state, action: PayloadAction<IUpdateUserSession>) {
        const session = state.session;
        if (session) {
            session.attempts = action.payload.attempts;
            session.win = action.payload.win;
            session.rewardName = action.payload.reward;
        }
        state.session = session;
    },

    clearOneSession(state, action: PayloadAction<string>) {
        const sessionIndex = state.sessions.findIndex(session => session._id === action.payload);
        if(sessionIndex !== -1) {
            const sessionData = state.sessions[sessionIndex];
            sessionData.status = 'finished';
            state.sessions[sessionIndex] = sessionData;
        }
    },

    clearSession(state) {
        state.session = null;
        state.sessions = [];
    },
  },
});

export const { setSession, setSessions, clearSession, clearOneSession, updateUserSession } = gameSlice.actions;
export default gameSlice.reducer;
