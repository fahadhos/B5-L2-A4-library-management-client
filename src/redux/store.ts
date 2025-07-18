import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from '../api/baseApi';
export const store = configureStore({



    reducer:{

        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware:(getDefaultMiddleware) =>getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);