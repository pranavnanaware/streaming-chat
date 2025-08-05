export interface GenericItem {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface GenericItemCreate {
  name: string;
  description?: string;
}

export interface GenericItemUpdate {
  name?: string;
  description?: string;
}