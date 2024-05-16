import { configureStore } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';

import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './authSlice';
import gameReducer from './gameSlice';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['auth', 'game'], 
};
const rootReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
