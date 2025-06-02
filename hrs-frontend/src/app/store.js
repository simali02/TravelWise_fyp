import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthAPI } from '../services/userAuthAPI'
import authReducer from '../features/authSlice'
import userReducer from '../features/userSlice'
export const store = configureStore({
  reducer: {
    [userAuthAPI.reducerPath]: userAuthAPI.reducer,
    auth: authReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthAPI.middleware),
})

setupListeners(store.dispatch)