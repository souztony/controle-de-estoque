import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api/axios';
import { RawMaterial } from '../types';

export const fetchMaterials = createAsyncThunk('materials/fetch', async () => {
  const { data } = await api.get<RawMaterial[]>('/raw-materials');
  return data;
});

interface MaterialState {
  items: RawMaterial[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
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
      .addCase(fetchMaterials.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchMaterials.fulfilled, (state, action: PayloadAction<RawMaterial[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      });
  },
});

export default materialSlice.reducer;