import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
// import authReducer from './features/authSlice';
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, cartReducer)
// const persistedAuthReducer = persistReducer(persistConfig, authReducer)
export const store = configureStore({
    reducer: {
        cartItems: persistedReducer,
        // auth: persistedAuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
})
export const persistor = persistStore(store)