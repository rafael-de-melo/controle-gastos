import { apiFetch } from "./api";

export interface PessoaOption {
  id: number;
  nome: string;
  idade: number;
}

export async function listarPessoas(): Promise<PessoaOption[]> {
  return apiFetch<PessoaOption[]>('/pessoas');
}