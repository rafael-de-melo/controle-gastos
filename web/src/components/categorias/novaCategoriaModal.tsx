import { useState } from 'react';
import { BaseModal } from '../common/baseModal';
import { criarCategoria } from '../../services/categorias.service';
import type { Categoria } from '../../interfaces/categoria';

interface Props {
  aberto: boolean;
  onFechar: () => void;
  onCriada: (categoria: Categoria) => Promise<void> | void;
}

export function NovaCategoriaModal({ aberto, onFechar, onCriada }: Props) {
  const [descricao, setDescricao] = useState('');
  const [finalidade, setFinalidade] = useState('1');
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  function limpar() {
    setDescricao('');
    setFinalidade('1');
    setErro('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSalvando(true);
      setErro('');

      const categoria = await criarCategoria({
        descricao,
        finalidade: Number(finalidade),
      });

      await onCriada(categoria);

      limpar();
      onFechar();
    } catch {
      setErro('Não foi possível criar a categoria.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <BaseModal aberto={aberto} titulo="Nova categoria" onFechar={onFechar}>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-field form-field--full">
          <label>Descrição</label>
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            maxLength={400}
            required
          />
        </div>

        <div className="form-field">
          <label>Finalidade</label>

          <select
            value={finalidade}
            onChange={(e) => setFinalidade(e.target.value)}
          >
            <option value="1">Despesa</option>
            <option value="2">Receita</option>
            <option value="3">Ambas</option>
          </select>
        </div>

        {erro && <p className="form-error">{erro}</p>}

        <div className="form-actions form-field--full">
          <button
            type="button"
            className="app__button"
            onClick={onFechar}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="app__primary-button"
            disabled={salvando}
          >
            {salvando ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}