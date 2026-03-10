import { apiFetch } from './api';
import type { Transacao } from '../interfaces/transacao';

export interface CriarTransacaoPayload {
  descricao: string;
  valor: number;
  data: string;
  tipo: number;
  pessoaId: number;
  categoriaId: number;
}

export async function listarTransacoes(): Promise<Transacao[]> {
  return apiFetch<Transacao[]>('/transacoes');
}

export async function criarTransacao(payload: CriarTransacaoPayload): Promise<Transacao> {
  return apiFetch<Transacao>('/transacoes', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function removerTransacao(id: number): Promise<void> {
  await apiFetch<void>(`/transacoes/${id}`, {
    method: 'DELETE',
  });
}