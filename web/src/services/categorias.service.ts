import { apiFetch } from './api';
import type { Categoria, CriarCategoriaPayload } from '../types/categoria';

export async function listarCategorias(): Promise<Categoria[]> {
  return apiFetch<Categoria[]>('/categorias');
}

export async function criarCategoria(
  payload: CriarCategoriaPayload
): Promise<Categoria> {
  return apiFetch<Categoria>('/categorias', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function removerCategoria(id: number): Promise<void> {
  await apiFetch<void>(`/categorias/${id}`, {
    method: 'DELETE',
  });
}