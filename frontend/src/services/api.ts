import axios from 'axios';
import { GenericItem, GenericItemCreate, GenericItemUpdate } from '../types';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const genericItemApi = {
  // Get all items
  getItems: async (skip: number = 0, limit: number = 100): Promise<GenericItem[]> => {
    const response = await api.get(`/items?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  // Get single item by ID
  getItem: async (id: number): Promise<GenericItem> => {
    const response = await api.get(`/items/${id}`);
    return response.data;
  },

  // Create new item
  createItem: async (item: GenericItemCreate): Promise<GenericItem> => {
    const response = await api.post('/items', item);
    return response.data;
  },

  // Update item
  updateItem: async (id: number, item: GenericItemUpdate): Promise<GenericItem> => {
    const response = await api.put(`/items/${id}`, item);
    return response.data;
  },

  // Delete item
  deleteItem: async (id: number): Promise<void> => {
    await api.delete(`/items/${id}`);
  },
};