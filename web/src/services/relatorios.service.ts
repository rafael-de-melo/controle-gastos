import { apiFetch } from './api';
import type { TotaisPorPessoaResponse, TotaisPorCategoriaResponse, } from '../interfaces/relatorio';

export async function obterTotaisPorPessoa(): Promise<TotaisPorPessoaResponse> {
  return apiFetch<TotaisPorPessoaResponse>('/relatorios/totais-por-pessoa');
}

export async function obterTotaisPorCategoria(): Promise<TotaisPorCategoriaResponse> {
  return apiFetch<TotaisPorCategoriaResponse>('/relatorios/totais-por-categoria');
}