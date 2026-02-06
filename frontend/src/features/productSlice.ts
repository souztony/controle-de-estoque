import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; // Corrigido: import type
import axios from 'axios';
import type { Product } from '../types/index'; // Corrigido: import type e caminho explícito

const API_URL = 'http://localhost:8080/products';

// Ações Assíncronas (Thunks)
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await axios.get<Product[]>(API_URL);
  return response.data;
});

export const saveProduct = createAsyncThunk('products/save', async (product: Product) => {
  const response = await axios.post<Product>(API_URL, product);
  return response.data;
});

interface ProductState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductState = {
  items: [],
  status: 'idle',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(saveProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items.push(action.payload);
      });
  },
});

export default productSlice.reducer;