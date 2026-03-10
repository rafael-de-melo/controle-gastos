import { useEffect, useMemo, useState } from 'react';
import { BaseModal } from '../common/baseModal';
import { listarPessoas } from '../../services/pessoas.service';
import { listarCategorias } from '../../services/categorias.service';
import { criarTransacao } from '../../services/transacoes.service';
import type { Transacao } from '../../interfaces/transacao';

interface Props {
  aberto: boolean;
  onFechar: () => void;
  onCriada: (transacao: Transacao) => void;
}

interface PessoaOption {
  id: number;
  nome: string;
  idade: number;
}

interface CategoriaOption {
  id: number;
  descricao: string;
  finalidade: number;
}

const TIPO_DESPESA = 1;
const TIPO_RECEITA = 2;

const FINALIDADE_DESPESA = 1;
const FINALIDADE_RECEITA = 2;
const FINALIDADE_AMBAS = 3;

export function NovaTransacaoModal({ aberto, onFechar, onCriada }: Props) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [tipo, setTipo] = useState<number>(TIPO_DESPESA);
  const [pessoaId, setPessoaId] = useState('');
  const [categoriaId, setCategoriaId] = useState('');

  const [pessoas, setPessoas] = useState<PessoaOption[]>([]);
  const [categorias, setCategorias] = useState<CategoriaOption[]>([]);
  const [carregandoOpcoes, setCarregandoOpcoes] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!aberto) return;

    async function carregarOpcoes() {
      try {
        setCarregandoOpcoes(true);
        setErro('');

        const [pessoasData, categoriasData] = await Promise.all([
          listarPessoas(),
          listarCategorias(),
        ]);

        setPessoas(pessoasData);
        setCategorias(categoriasData);
      } catch {
        setErro('Não foi possível carregar pessoas e categorias.');
      } finally {
        setCarregandoOpcoes(false);
      }
    }

    carregarOpcoes();
  }, [aberto]);

  const pessoaSelecionada = useMemo(
    () => pessoas.find((p) => p.id === Number(pessoaId)),
    [pessoas, pessoaId]
  );

  const categoriasDisponiveis = useMemo(() => {
    if (!pessoaSelecionada) return categorias;

    const menorDeIdade = pessoaSelecionada.idade < 18;

    if (!menorDeIdade) return categorias;

    return categorias.filter(
      (categoria) => categoria.finalidade !== FINALIDADE_RECEITA
    );
  }, [categorias, pessoaSelecionada]);

  const categoriaSelecionada = useMemo(
    () => categoriasDisponiveis.find((c) => c.id === Number(categoriaId)),
    [categoriasDisponiveis, categoriaId]
  );

  const tipoTravado = useMemo(() => {
    if (!pessoaSelecionada || !categoriaSelecionada) return false;

    if (pessoaSelecionada.idade < 18) return true;
    return categoriaSelecionada.finalidade !== FINALIDADE_AMBAS;
  }, [pessoaSelecionada, categoriaSelecionada]);

  useEffect(() => {
    if (!pessoaSelecionada) return;

    if (pessoaSelecionada.idade < 18) {
      setTipo(TIPO_DESPESA);
    }
  }, [pessoaSelecionada]);

  useEffect(() => {
    if (!categoriaSelecionada) return;

    if (categoriaSelecionada.finalidade === FINALIDADE_DESPESA) {
      setTipo(TIPO_DESPESA);
    }

    if (categoriaSelecionada.finalidade === FINALIDADE_RECEITA) {
      setTipo(TIPO_RECEITA);
    }

    if (
      pessoaSelecionada &&
      pessoaSelecionada.idade < 18 &&
      categoriaSelecionada.finalidade === FINALIDADE_AMBAS
    ) {
      setTipo(TIPO_DESPESA);
    }
  }, [categoriaSelecionada, pessoaSelecionada]);

  useEffect(() => {
    if (
      categoriaId &&
      !categoriasDisponiveis.some((categoria) => categoria.id === Number(categoriaId))
    ) {
      setCategoriaId('');
    }
  }, [categoriasDisponiveis, categoriaId]);

  function limparFormulario() {
    setDescricao('');
    setValor('');
    setData('');
    setTipo(TIPO_DESPESA);
    setPessoaId('');
    setCategoriaId('');
    setErro('');
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      setSalvando(true);
      setErro('');

      const transacao = await criarTransacao({
        descricao,
        valor: Number(valor),
        data,
        tipo,
        pessoaId: Number(pessoaId),
        categoriaId: Number(categoriaId),
      });

      onCriada(transacao);
      limparFormulario();
      onFechar();
    } catch {
      setErro('Não foi possível criar a transação.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <BaseModal aberto={aberto} titulo="Nova transação" onFechar={onFechar}>
      {carregandoOpcoes ? (
        <p>Carregando opções...</p>
      ) : (
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-field form-field--full">
            <label htmlFor="descricao">Descrição</label>
            <input
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="valor">Valor</label>
            <input
              id="valor"
              type="number"
              min="0.01"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="data">Data</label>
            <input
              id="data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="pessoa">Pessoa</label>
            <select
              id="pessoa"
              value={pessoaId}
              onChange={(e) => setPessoaId(e.target.value)}
              required
            >
              {pessoas.map((pessoa) => (
                <option key={pessoa.id} value={pessoa.id}>
                  {pessoa.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="categoria">Categoria</label>
            <select
              id="categoria"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              required
            >
              {categoriasDisponiveis.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.descricao}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="tipo">Tipo</label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(Number(e.target.value))}
              disabled={tipoTravado}
              required
            >
              <option value={TIPO_DESPESA}>Despesa</option>
              <option value={TIPO_RECEITA}>Receita</option>
            </select>
          </div>

          {erro && <p className="form-error">{erro}</p>}

          <div className="form-actions form-field--full">
            <button type="button" className="app__button" onClick={onFechar}>
              Cancelar
            </button>
            <button type="submit" className="app__primary-button" disabled={salvando}>
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      )}
    </BaseModal>
  );
}