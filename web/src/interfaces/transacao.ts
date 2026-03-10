export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  tipo: number;
  pessoaId: number;
  categoriaId: number;
  nomePessoa: string;
  descricaoCategoria: string;
}