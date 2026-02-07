import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api/axios';
import type { Product } from '../types/index';

// Ações Assíncronas (Thunks)
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await api.get<Product[]>('/products');
  return response.data;
});

export const saveProduct = createAsyncThunk('products/save', async (product: Product) => {
  const response = await api.post<Product>('/products', product);
  return response.data;
});

export const updateProduct = createAsyncThunk('products/update', async (product: Product) => {
  const response = await api.put<Product>(`/products/${product.id}`, product);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/delete', async (id: number) => {
  await api.delete(`/products/${id}`);
  return id;
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
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;