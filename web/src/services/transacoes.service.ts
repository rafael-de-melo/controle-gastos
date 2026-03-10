import { apiFetch } from './api';
import type { Transacao } from '../interfaces/transacao';

export async function listarTransacoes(): Promise<Transacao[]> {
  return apiFetch<Transacao[]>('/transacoes');
}