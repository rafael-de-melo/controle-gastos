import { useEffect, useState } from 'react';
import { BaseModal } from '../common/baseModal';
import { listarCategorias, removerCategoria } from '../../services/categorias.service';
import type { Categoria } from '../../interfaces/categoria';
import { NovaCategoriaModal } from './novaCategoriaModal';

interface Props {
  aberto: boolean;
  onFechar: () => void;
}

export function CategoriasModal({ aberto, onFechar }: Props) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [menuAbertoId, setMenuAbertoId] = useState<number | null>(null);
  const [modalNovaAberto, setModalNovaAberto] = useState(false);

  async function carregarCategorias() {
    try {
      setCarregando(true);
      setErro('');

      const data = await listarCategorias();
      setCategorias(data);
    } catch {
      setErro('Não foi possível carregar categorias.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (!aberto) return;

    carregarCategorias();
  }, [aberto]);

  async function handleExcluir(id: number) {
    try {
      await removerCategoria(id);

      setMenuAbertoId(null);
      await carregarCategorias();
    } catch {
      setErro('Não foi possível excluir a categoria.');
    }
  }

  function finalidadeTexto(valor: number) {
    if (valor === 1) return 'Despesa';
    if (valor === 2) return 'Receita';
    return 'Ambas';
  }

  return (
    <>
      <BaseModal aberto={aberto} titulo="Categorias" onFechar={onFechar}>
        <div className="modal-section-header">
          <div>
            <h4 className="modal-section-title">Categorias cadastradas</h4>
            <p className="modal-section-subtitle">
              Gerencie categorias de receitas e despesas.
            </p>
          </div>

          <button
            className="app__primary-button"
            onClick={() => setModalNovaAberto(true)}
          >
            Nova categoria
          </button>
        </div>

        <div className="table-card">
          {carregando && (
            <div className="table-feedback">Carregando...</div>
          )}

          {!carregando && erro && (
            <div className="table-feedback table-feedback--error">
              {erro}
            </div>
          )}

          {!carregando && !erro && categorias.length === 0 && (
            <div className="table-feedback">
              Nenhuma categoria cadastrada.
            </div>
          )}

          {!carregando && !erro && categorias.length > 0 && (
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Finalidade</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {categorias.map((categoria) => (
                  <tr key={categoria.id}>
                    <td>{categoria.descricao}</td>

                    <td>{finalidadeTexto(categoria.finalidade)}</td>

                    <td className="actions-cell">
                      <div className="row-actions">
                        <button
                          className="icon-button"
                          onClick={() =>
                            setMenuAbertoId((atual) =>
                              atual === categoria.id ? null : categoria.id
                            )
                          }
                        >
                          ⋯
                        </button>

                        {menuAbertoId === categoria.id && (
                          <div className="actions-menu">
                            <button
                              className="actions-menu__item"
                              onClick={() => handleExcluir(categoria.id)}
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

      <NovaCategoriaModal
        aberto={modalNovaAberto}
        onFechar={() => setModalNovaAberto(false)}
        onCriada={carregarCategorias}
      />
    </>
  );
}