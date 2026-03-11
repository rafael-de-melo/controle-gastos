import { useState } from 'react';
import { BaseModal } from '../common/baseModal';
import { criarPessoa } from '../../services/pessoas.service';
import type { Pessoa } from '../../interfaces/pessoa';

interface NovaPessoaModalProps {
  aberto: boolean;
  onFechar: () => void;
  onCriada: (pessoa: Pessoa) => Promise<void> | void;
}

export function NovaPessoaModal({
  aberto,
  onFechar,
  onCriada,
}: NovaPessoaModalProps) {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  function limparFormulario() {
    setNome('');
    setIdade('');
    setErro('');
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      setSalvando(true);
      setErro('');

      const pessoaCriada = await criarPessoa({
        nome: nome.trim(),
        idade: Number(idade),
      });

      await onCriada(pessoaCriada);
      limparFormulario();
      onFechar();
    } catch {
      setErro('Não foi possível criar a pessoa.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <BaseModal aberto={aberto} titulo="Nova pessoa" onFechar={onFechar}>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-field form-field--full">
          <label htmlFor="pessoa-nome">Nome</label>
          <input
            id="pessoa-nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            maxLength={200}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="pessoa-idade">Idade</label>
          <input
            id="pessoa-idade"
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
            {salvando ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}