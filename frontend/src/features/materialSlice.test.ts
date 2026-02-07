import { describe, it, expect } from 'vitest';
import materialReducer from '../features/materialSlice';

describe('materialSlice', () => {
  const initialState = {
    items: [],
    status: 'idle' as const,
  };

  it('should return the initial state', () => {
    expect(materialReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchMaterials.fulfilled', () => {
    const materials = [{ id: 1, code: 'M1', name: 'Material 1', stockQuantity: 10 }];
    const action = { type: 'materials/fetch/fulfilled', payload: materials };
    const state = materialReducer(initialState, action);
    expect(state.items).toEqual(materials);
    expect(state.status).toBe('idle');
  });
});
