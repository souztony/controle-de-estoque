import { configureStore } from '@reduxjs/toolkit';
import materialReducer from '../features/materialSlice';
import productReducer from '../features/productSlice';

export const store = configureStore({
  reducer: {
    materials: materialReducer,
    products: productReducer,
  },
});

// Tipos cruciais para TypeScript no Redux moderno
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;