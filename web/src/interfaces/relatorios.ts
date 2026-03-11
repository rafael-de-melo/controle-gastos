export interface TotaisPorPessoaItem {
  pessoaId: number;
  nomePessoa: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface TotaisPorPessoaResponse {
  pessoas: TotaisPorPessoaItem[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoGeral: number;
}

export interface TotaisPorCategoriaItem {
  categoriaId: number;
  descricaoCategoria: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface TotaisPorCategoriaResponse {
  categorias: TotaisPorCategoriaItem[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoGeral: number;
}