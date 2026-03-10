import { useEffect, useState } from 'react';
import './App.css';
import { listarTransacoes, removerTransacao } from './services/transacoes.service';
import type { Transacao } from './interfaces/transacao';
import { formatarData, formatarTipo, formatarValor } from './utils/transacoes';
import { NovaTransacaoModal } from './components/transacoes/novaTransacaoModal';

function App() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [modalNovaTransacaoAberto, setModalNovaTransacaoAberto] = useState(false);
  const [transacaoMenuAbertoId, setTransacaoMenuAbertoId] = useState<number | null>(null);

  async function carregarTransacoes() {
    try {
      setCarregando(true);
      setErro('');
      const dados = await listarTransacoes();
      setTransacoes(dados);
    } catch {
      setErro('Não foi possível carregar as transações.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarTransacoes();
  }, []);

  async function handleExcluirTransacao(id: number) {
    try {
      await removerTransacao(id);
      setTransacaoMenuAbertoId(null);
      await carregarTransacoes();
    } catch {
      setErro('Não foi possível excluir a transação.');
    }
  }

  async function handleTransacaoCriada() {
    await carregarTransacoes();
  }

  return (
    <main className="app">
      <section className="app__sidebar">
        <h1 className="app__title">Controle de Gastos</h1>

        <div className="app__actions">
          <button className="app__button" type="button">
            Pessoas
          </button>

          <button className="app__button" type="button">
            Categorias
          </button>

          <button className="app__button" type="button">
            Relatório
          </button>
        </div>
      </section>

      <section className="app__content">
        <div className="app__content-header">
          <div>
            <h2 className="app__section-title">Últimas transações</h2>
          </div>

          <button
            className="app__primary-button"
            type="button"
            onClick={() => setModalNovaTransacaoAberto(true)}
          >
            Nova transação
          </button>
        </div>

        <div className="table-card">
          {carregando && (
            <div className="table-feedback">Carregando transações...</div>
          )}

          {!carregando && erro && (
            <div className="table-feedback table-feedback--error">{erro}</div>
          )}

          {!carregando && !erro && transacoes.length === 0 && (
            <div className="table-feedback">Nenhuma transação cadastrada.</div>
          )}

          {!carregando && !erro && transacoes.length > 0 && (
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Tipo</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Pessoa</th>
                  <th>Categoria</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {transacoes.map((transacao) => (
                  <tr key={transacao.id}>
                    <td>{transacao.descricao}</td>
                    <td>{formatarTipo(transacao.tipo)}</td>
                    <td>{formatarValor(transacao.valor)}</td>
                    <td>{formatarData(transacao.data)}</td>
                    <td>{transacao.nomePessoa}</td>
                    <td>{transacao.descricaoCategoria}</td>
                    <td className="actions-cell">
                      <div className="row-actions">
                        <button
                          className="icon-button"
                          type="button"
                          onClick={() =>
                            setTransacaoMenuAbertoId((atual) =>
                              atual === transacao.id ? null : transacao.id
                            )
                          }
                        >
                          ⋯
                        </button>

                        {transacaoMenuAbertoId === transacao.id && (
                          <div className="actions-menu">
                            <button
                              type="button"
                              className="actions-menu__item"
                              onClick={() => handleExcluirTransacao(transacao.id)}
                            >
                              Excluir
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <NovaTransacaoModal
        aberto={modalNovaTransacaoAberto}
        onFechar={() => setModalNovaTransacaoAberto(false)}
        onCriada={handleTransacaoCriada}
      />
    </main>
  );
}

export default App;