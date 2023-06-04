import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authApi } from './api/authApi'
import { userReducer } from './slices/userSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { authReducer } from './slices/authSlice'
import { postApi } from './api/postsApi'

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  user: userReducer,
  auth: authReducer,
})

// За докой по redux-persist идем на https://github.com/rt2zz/redux-persist
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  // сетевые данные в localStorage не сохраняем
  blacklist: [authApi.reducerPath, postApi.reducerPath],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // из доки redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([authApi.middleware, postApi.middleware]),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
