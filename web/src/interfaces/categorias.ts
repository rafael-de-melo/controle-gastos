export interface Categoria {
  id: number;
  descricao: string;
  finalidade: number;
}

export interface CriarCategoriaPayload {
  descricao: string;
  finalidade: number;
}