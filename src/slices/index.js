import { configureStore } from '@reduxjs/toolkit'
import {
    persistReducer,
    persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from './auth'

const commoinfig = {
    key : 'auth',
    storage,
    version: 1,
}
const userCongig ={
    ...commoinfig,
    whitelist : ['error','currentUser','isAuthenticated','isAdmin'],
}


export const store = configureStore({
    reducer :{
        // app : appSlice,
        auth : persistReducer(userCongig,authSlice),
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export const persiststore =  persistStore(store);