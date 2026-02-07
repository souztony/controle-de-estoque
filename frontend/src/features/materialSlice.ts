import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api/axios';
import type { RawMaterial } from '../types/index';

// Busca dados do Quarkus - Adicionado try/catch implícito via Thunk
export const fetchMaterials = createAsyncThunk('materials/fetch', async () => {
  const { data } = await api.get<RawMaterial[]>('/raw-materials');
  return data;
});

// Envia dados para o Quarkus
export const addMaterial = createAsyncThunk('materials/add', async (material: Partial<RawMaterial>) => {
  const { data } = await api.post<RawMaterial>('/raw-materials', material);
  return data;
});

export const updateMaterial = createAsyncThunk('materials/update', async (material: RawMaterial) => {
  const { data } = await api.put<RawMaterial>(`/raw-materials/${material.id}`, material);
  return data;
});

export const deleteMaterial = createAsyncThunk('materials/delete', async (id: number) => {
  await api.delete(`/raw-materials/${id}`);
  return id;
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
      // Fetch Materials
      .addCase(fetchMaterials.pending, (state) => { 
        state.status = 'loading'; 
      })
      .addCase(fetchMaterials.fulfilled, (state, action: PayloadAction<RawMaterial[]>) => {
        state.status = 'idle';
        // Garante que items seja sempre um array, mesmo que a API venha vazia
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchMaterials.rejected, (state) => { 
        state.status = 'failed'; 
      })
      
      // Add Material
      .addCase(addMaterial.fulfilled, (state, action: PayloadAction<RawMaterial>) => {
        state.items.push(action.payload);
      })
      
      // Update Material
      .addCase(updateMaterial.fulfilled, (state, action: PayloadAction<RawMaterial>) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // Delete Material
      .addCase(deleteMaterial.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default materialSlice.reducer;