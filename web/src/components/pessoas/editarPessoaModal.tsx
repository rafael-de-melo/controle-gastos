import { useEffect, useState } from 'react';
import { BaseModal } from '../common/baseModal';
import { editarPessoa } from '../../services/pessoas.service';
import type { Pessoa } from '../../interfaces/pessoa';

interface EditarPessoaModalProps {
  aberto: boolean;
  pessoa: Pessoa | null;
  onFechar: () => void;
  onAtualizada: () => Promise<void> | void;
}

export function EditarPessoaModal({
  aberto,
  pessoa,
  onFechar,
  onAtualizada,
}: EditarPessoaModalProps) {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!pessoa) return;

    setNome(pessoa.nome);
    setIdade(String(pessoa.idade));
    setErro('');
  }, [pessoa]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!pessoa) return;

    try {
      setSalvando(true);
      setErro('');

      await editarPessoa(pessoa.id, {
        nome: nome.trim(),
        idade: Number(idade),
      });

      await onAtualizada();
      onFechar();
    } catch {
      setErro('Não foi possível editar a pessoa.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <BaseModal aberto={aberto} titulo="Editar pessoa" onFechar={onFechar}>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-field form-field--full">
          <label htmlFor="editar-pessoa-nome">Nome</label>
          <input
            id="editar-pessoa-nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            maxLength={200}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="editar-pessoa-idade">Idade</label>
          <input
            id="editar-pessoa-idade"
            type="number"
            min="0"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
          />
        </div>

        {erro && <p className="form-error">{erro}</p>}

        <div className="form-actions form-field--full">
          <button
            type="button"
            className="app__button"
            onClick={onFechar}
            disabled={salvando}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="app__primary-button"
            disabled={salvando}
          >
            {salvando ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}