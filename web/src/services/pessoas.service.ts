import { apiFetch } from "./api";
import type { CriarPessoaPayload, EditarPessoaPayload, Pessoa } from '../interfaces/pessoa';


export async function listarPessoas(): Promise<Pessoa[]> {
  return apiFetch<Pessoa[]>('/pessoas');
}

export async function criarPessoa(payload: CriarPessoaPayload): Promise<Pessoa> {
  return apiFetch<Pessoa>('/pessoas', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function editarPessoa(
  id: number,
  payload: EditarPessoaPayload
): Promise<void> {
  await apiFetch<void>(`/pessoas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function removerPessoa(id: number): Promise<void> {
  await apiFetch<void>(`/pessoas/${id}`, {
    method: 'DELETE',
  });
}