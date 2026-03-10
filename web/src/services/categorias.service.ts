import { apiFetch } from './api';

export interface CategoriaOption {
  id: number;
  descricao: string;
  finalidade: number;
}

export async function listarCategorias(): Promise<CategoriaOption[]> {
  return apiFetch<CategoriaOption[]>('/categorias');
}