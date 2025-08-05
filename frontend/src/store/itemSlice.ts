import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GenericItem, GenericItemCreate, GenericItemUpdate } from '../types';
import { genericItemApi } from '../services/api';

interface ItemsState {
  items: GenericItem[];
  currentItem: GenericItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  currentItem: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async ({ skip = 0, limit = 100 }: { skip?: number; limit?: number } = {}) => {
    return await genericItemApi.getItems(skip, limit);
  }
);

export const fetchItem = createAsyncThunk(
  'items/fetchItem',
  async (id: number) => {
    return await genericItemApi.getItem(id);
  }
);

export const createItem = createAsyncThunk(
  'items/createItem',
  async (item: GenericItemCreate) => {
    return await genericItemApi.createItem(item);
  }
);

export const updateItem = createAsyncThunk(
  'items/updateItem',
  async ({ id, item }: { id: number; item: GenericItemUpdate }) => {
    return await genericItemApi.updateItem(id, item);
  }
);

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (id: number) => {
    await genericItemApi.deleteItem(id);
    return id;
  }
);

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch items
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<GenericItem[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch items';
      })
      // Fetch single item
      .addCase(fetchItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItem.fulfilled, (state, action: PayloadAction<GenericItem>) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch item';
      })
      // Create item
      .addCase(createItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, action: PayloadAction<GenericItem>) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create item';
      })
      // Update item
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, action: PayloadAction<GenericItem>) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentItem?.id === action.payload.id) {
          state.currentItem = action.payload;
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update item';
      })
      // Delete item
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        if (state.currentItem?.id === action.payload) {
          state.currentItem = null;
        }
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete item';
      });
  },
});

export const { clearError, clearCurrentItem } = itemSlice.actions;
export default itemSlice.reducer;