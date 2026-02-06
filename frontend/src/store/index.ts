import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productSlice';
import materialReducer from '../features/materialSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    materials: materialReducer,
  },
});

// AQUI ESTAVA O ERRO: Precisamos dos 'export' antes do type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;