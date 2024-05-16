// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAdmin: boolean;
  isLoggedIn: boolean;
  token: string | null;
}

interface LoginPayload {
  token: string;
  userRole: string;
}

const initialState: AuthState = {
  token: null,
  isAdmin: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.token = action.payload.token;
      state.isAdmin = action.payload.userRole === 'admin';
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
