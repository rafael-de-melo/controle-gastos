import { useEffect, useState } from 'react';
import { BaseModal } from '../common/baseModal';
import { listarPessoas, removerPessoa } from '../../services/pessoas.service';
import type { Pessoa } from '../../interfaces/pessoa';
import { NovaPessoaModal } from './novaPessoaModal';
import { EditarPessoaModal } from './editarPessoaModal';

interface PessoasModalProps {
  aberto: boolean;
  onFechar: () => void;
}

export function PessoasModal({ aberto, onFechar }: PessoasModalProps) {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [modalNovaPessoaAberto, setModalNovaPessoaAberto] = useState(false);
  const [modalEditarPessoaAberto, setModalEditarPessoaAberto] = useState(false);
  const [menuAbertoId, setMenuAbertoId] = useState<number | null>(null);
  const [pessoaSelecionada, setPessoaSelecionada] = useState<Pessoa | null>(null);

  async function carregarPessoas() {
    try {
      setCarregando(true);
      setErro('');

      const dados = await listarPessoas();
      setPessoas(dados);
    } catch {
      setErro('Não foi possível carregar as pessoas.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (!aberto) return;
    carregarPessoas();
  }, [aberto]);

  async function handleExcluirPessoa(id: number) {
    try {
      await removerPessoa(id);
      setMenuAbertoId(null);
      await carregarPessoas();
    } catch {
      setErro('Não foi possível excluir a pessoa.');
    }
  }

  function handleAbrirEdicao(pessoa: Pessoa) {
    setPessoaSelecionada(pessoa);
    setMenuAbertoId(null);
    setModalEditarPessoaAberto(true);
  }

  return (
    <>
      <BaseModal aberto={aberto} titulo="Pessoas" onFechar={onFechar}>
        <div className="modal-section-header">
          <div>
            <h4 className="modal-section-title">Pessoas cadastradas</h4>
            <p className="modal-section-subtitle">
              Gerencie as pessoas que podem receber transações.
            </p>
          </div>

          <button
            className="app__primary-button"
            type="button"
            onClick={() => setModalNovaPessoaAberto(true)}
          >
            Nova pessoa
          </button>
        </div>

        <div className="table-card">
          {carregando && (
            <div className="table-feedback">Carregando pessoas...</div>
          )}

          {!carregando && erro && (
            <div className="table-feedback table-feedback--error">{erro}</div>
          )}

          {!carregando && !erro && pessoas.length === 0 && (
            <div className="table-feedback">Nenhuma pessoa cadastrada.</div>
          )}

          {!carregando && !erro && pessoas.length > 0 && (
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Idade</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {pessoas.map((pessoa) => (
                  <tr key={pessoa.id}>
                    <td>{pessoa.nome}</td>
                    <td>{pessoa.idade}</td>
                    <td className="actions-cell">
                      <div className="row-actions">
                        <button
                          className="icon-button"
                          type="button"
                          onClick={() =>
                            setMenuAbertoId((atual) =>
                              atual === pessoa.id ? null : pessoa.id
                            )
                          }
                        >
                          ⋯
                        </button>

                        {menuAbertoId === pessoa.id && (
                          <div className="actions-menu">
                            <button
                              type="button"
                              className="actions-menu__item"
                              onClick={() => handleAbrirEdicao(pessoa)}
                            >
                              Editar
                            </button>

                            <button
                              type="button"
                              className="actions-menu__item"
                              onClick={() => handleExcluirPessoa(pessoa.id)}
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
      </BaseModal>

      <NovaPessoaModal
        aberto={modalNovaPessoaAberto}
        onFechar={() => setModalNovaPessoaAberto(false)}
        onCriada={carregarPessoas}
      />

      <EditarPessoaModal
        aberto={modalEditarPessoaAberto}
        pessoa={pessoaSelecionada}
        onFechar={() => {
          setModalEditarPessoaAberto(false);
          setPessoaSelecionada(null);
        }}
        onAtualizada={carregarPessoas}
      />
    </>
  );
}