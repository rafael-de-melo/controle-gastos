import { useEffect, useState } from 'react';
import { BaseModal } from '../common/baseModal';
import { obterTotaisPorPessoa, obterTotaisPorCategoria } from '../../services/relatorios.service';
import type { TotaisPorPessoaResponse, TotaisPorCategoriaResponse } from '../../interfaces/relatorio';
import { formatarValor } from '../../utils/transacoes';

interface RelatoriosModalProps {
  aberto: boolean;
  onFechar: () => void;
}

type TipoRelatorio = 'pessoas' | 'categorias';

export function RelatoriosModal({ aberto, onFechar }: RelatoriosModalProps) {
  const [tipoRelatorio, setTipoRelatorio] = useState<TipoRelatorio>('pessoas');
  const [dadosPessoa, setDadosPessoa] = useState<TotaisPorPessoaResponse | null>(null);
  const [dadosCategoria, setDadosCategoria] = useState<TotaisPorCategoriaResponse | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!aberto) return;

    async function carregarRelatorio() {
      try {
        setCarregando(true);
        setErro('');

        if (tipoRelatorio === 'pessoas') {
          const response = await obterTotaisPorPessoa();
          setDadosPessoa(response);
        } else {
          const response = await obterTotaisPorCategoria();
          setDadosCategoria(response);
        }
      } catch {
        setErro('Não foi possível carregar o relatório.');
      } finally {
        setCarregando(false);
      }
    }

    carregarRelatorio();
  }, [aberto, tipoRelatorio]);

  return (
    <BaseModal aberto={aberto} titulo="Relatórios" onFechar={onFechar}>
      <div className="modal-section-header">
        <div>
          <h4 className="modal-section-title">Consulta de totais</h4>
          <p className="modal-section-subtitle">
            Visualize totais consolidados por pessoa ou por categoria.
          </p>
        </div>
      </div>

      <div className="report-tabs">
        <button
          type="button"
          className={`report-tab ${tipoRelatorio === 'pessoas' ? 'report-tab--active' : ''}`}
          onClick={() => setTipoRelatorio('pessoas')}
        >
          Por pessoa
        </button>

        <button
          type="button"
          className={`report-tab ${tipoRelatorio === 'categorias' ? 'report-tab--active' : ''}`}
          onClick={() => setTipoRelatorio('categorias')}
        >
          Por categoria
        </button>
      </div>

      <div className="table-card">
        {carregando && (
          <div className="table-feedback">Carregando relatório...</div>
        )}

        {!carregando && erro && (
          <div className="table-feedback table-feedback--error">{erro}</div>
        )}

        {!carregando && !erro && tipoRelatorio === 'pessoas' && dadosPessoa && (
          <>
            {dadosPessoa.pessoas.length === 0 ? (
              <div className="table-feedback">Nenhuma pessoa encontrada.</div>
            ) : (
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Pessoa</th>
                    <th>Receitas</th>
                    <th>Despesas</th>
                    <th>Saldo</th>
                  </tr>
                </thead>

                <tbody>
                  {dadosPessoa.pessoas.map((pessoa) => (
                    <tr key={pessoa.pessoaId}>
                      <td>{pessoa.nomePessoa}</td>
                      <td>{formatarValor(pessoa.totalReceitas)}</td>
                      <td>{formatarValor(pessoa.totalDespesas)}</td>
                      <td>{formatarValor(pessoa.saldo)}</td>
                    </tr>
                  ))}

                  <tr className="report-total-row">
                    <td><strong>Total geral</strong></td>
                    <td><strong>{formatarValor(dadosPessoa.totalGeralReceitas)}</strong></td>
                    <td><strong>{formatarValor(dadosPessoa.totalGeralDespesas)}</strong></td>
                    <td><strong>{formatarValor(dadosPessoa.saldoGeral)}</strong></td>
                  </tr>
                </tbody>
              </table>
            )}
          </>
        )}

        {!carregando && !erro && tipoRelatorio === 'categorias' && dadosCategoria && (
          <>
            {dadosCategoria.categorias.length === 0 ? (
              <div className="table-feedback">Nenhuma categoria encontrada.</div>
            ) : (
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Categoria</th>
                    <th>Receitas</th>
                    <th>Despesas</th>
                    <th>Saldo</th>
                  </tr>
                </thead>

                <tbody>
                  {dadosCategoria.categorias.map((categoria) => (
                    <tr key={categoria.categoriaId}>
                      <td>{categoria.descricaoCategoria}</td>
                      <td>{formatarValor(categoria.totalReceitas)}</td>
                      <td>{formatarValor(categoria.totalDespesas)}</td>
                      <td>{formatarValor(categoria.saldo)}</td>
                    </tr>
                  ))}

                  <tr className="report-total-row">
                    <td><strong>Total geral</strong></td>
                    <td><strong>{formatarValor(dadosCategoria.totalGeralReceitas)}</strong></td>
                    <td><strong>{formatarValor(dadosCategoria.totalGeralDespesas)}</strong></td>
                    <td><strong>{formatarValor(dadosCategoria.saldoGeral)}</strong></td>
                  </tr>
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </BaseModal>
  );
}