// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAdmin: boolean;
  isLoggedIn: boolean;
  token: string | null;
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
    login(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
