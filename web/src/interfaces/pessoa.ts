export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export interface CriarPessoaPayload {
  nome: string;
  idade: number;
}

export interface EditarPessoaPayload {
  nome: string;
  idade: number;
}