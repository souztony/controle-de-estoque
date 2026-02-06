import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
// Mudamos para o caminho completo do arquivo para não ter erro de resolução
import type { RawMaterial } from '../types/index'; 

const API_URL = 'http://localhost:8080/raw-materials';

export const fetchMaterials = createAsyncThunk('materials/fetch', async () => {
  const response = await axios.get<RawMaterial[]>(API_URL);
  return response.data;
});

export const addMaterial = createAsyncThunk('materials/add', async (material: RawMaterial) => {
  const response = await axios.post<RawMaterial>(API_URL, material);
  return response.data;
});

interface MaterialState {
  items: RawMaterial[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MaterialState = {
  items: [],
  status: 'idle',
};

const materialSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => { 
        state.status = 'loading'; 
      })
      .addCase(fetchMaterials.fulfilled, (state, action: PayloadAction<RawMaterial[]>) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(addMaterial.fulfilled, (state, action: PayloadAction<RawMaterial>) => {
        state.items.push(action.payload);
      });
  },
});

export default materialSlice.reducer;