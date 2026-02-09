import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api/axios';
import type { RawMaterial } from '../types/index';

export const fetchMaterials = createAsyncThunk('materials/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<RawMaterial[]>('/raw-materials');
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const addMaterial = createAsyncThunk('materials/add', async (material: Partial<RawMaterial>, { rejectWithValue }) => {
  try {
    const { data } = await api.post<RawMaterial>('/raw-materials', material);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const updateMaterial = createAsyncThunk('materials/update', async (material: RawMaterial, { rejectWithValue }) => {
  try {
    const { data } = await api.put<RawMaterial>(`/raw-materials/${material.id}`, material);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const deleteMaterial = createAsyncThunk('materials/delete', async (id: number, { rejectWithValue }) => {
  try {
    await api.delete(`/raw-materials/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
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
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchMaterials.rejected, (state) => { 
        state.status = 'failed'; 
      })
      
      .addCase(addMaterial.fulfilled, (state, action: PayloadAction<RawMaterial>) => {
        state.items.push(action.payload);
      })
      
      .addCase(updateMaterial.fulfilled, (state, action: PayloadAction<RawMaterial>) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(deleteMaterial.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default materialSlice.reducer;