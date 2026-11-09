
"use client";

import { useState } from "react";

export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [filtro, setFiltro] = useState("todas");

  function adicionarTarefa(e) {
    e.preventDefault();

    if (novaTarefa.trim() === "") {
      return;
    }

    const tarefa = {
      id: Date.now(),
      texto: novaTarefa,
      concluida: false
    };

    setTarefas([...tarefas, tarefa]);
    setNovaTarefa("");
  }

  function concluirTarefa(id) {
    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return {
          ...tarefa,
          concluida: !tarefa.concluida
        };
      }

      return tarefa;
    });

    setTarefas(novasTarefas);
  }

  function excluirTarefa(id) {
    const novasTarefas = tarefas.filter((tarefa) => {
      return tarefa.id !== id;
    });

    setTarefas(novasTarefas);
  }

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") {
      return !tarefa.concluida;
    }

    if (filtro === "concluidas") {
      return tarefa.concluida;
    }

    return true;
  });

  const pendentes = tarefas.filter((tarefa) => !tarefa.concluida).length;
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;

  return (
    <main className="pagina">
      <div className="container">

        <header className="cabecalho">
          <div className="logo">✓</div>
          <p className="subtitulo">ORGANIZE SUA ROTINA</p>
          <h1>Minhas tarefas<span>.</span></h1>
          <p className="descricao">
            Um passo de cada vez. Organize suas atividades e
            acompanhe seu progresso.
          </p>
        </header>

        <section className="painel">

          <div className="resumo">
            <div>
              <p className="resumo-titulo">Total de tarefas</p>
              <h2>{tarefas.length}</h2>
            </div>

            <div className="estatisticas">
              <div className="estatistica">
                <span className="bolinha pendente"></span>
                <span>{pendentes} pendentes</span>
              </div>

              <div className="estatistica">
                <span className="bolinha concluida"></span>
                <span>{concluidas} concluídas</span>
              </div>
            </div>
          </div>

          <form className="formulario" onSubmit={adicionarTarefa}>
            <input
              type="text"
              placeholder="O que você precisa fazer?"
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
            />

            <button type="submit">+ Adicionar</button>
          </form>

          <div className="filtros">
            <button
              className={filtro === "todas" ? "ativo" : ""}
              onClick={() => setFiltro("todas")}
            >
              Todas
            </button>

            <button
              className={filtro === "pendentes" ? "ativo" : ""}
              onClick={() => setFiltro("pendentes")}
            >
              Pendentes
            </button>

            <button
              className={filtro === "concluidas" ? "ativo" : ""}
              onClick={() => setFiltro("concluidas")}
            >
              Concluídas
            </button>
          </div>

          <div className="lista-tarefas">

            {tarefasFiltradas.length === 0 ? (
              <div className="vazio">
                <div className="icone-vazio">☰</div>
                <h3>Nenhuma tarefa por aqui</h3>
                <p>
                  {tarefas.length === 0
                    ? "Adicione sua primeira tarefa para começar!"
                    : "Não existem tarefas neste filtro."}
                </p>
              </div>
            ) : (
              tarefasFiltradas.map((tarefa) => (
                <div
                  className={`tarefa ${tarefa.concluida ? "finalizada" : ""}`}
                  key={tarefa.id}
                >
                  <button
                    className="botao-concluir"
                    onClick={() => concluirTarefa(tarefa.id)}
                    aria-label={
                      tarefa.concluida
                        ? "Marcar como pendente"
                        : "Marcar como concluída"
                    }
                  >
                    {tarefa.concluida ? "✓" : ""}
                  </button>

                  <span className="texto-tarefa">
                    {tarefa.texto}
                  </span>

                  <button
                    className="botao-excluir"
                    onClick={() => excluirTarefa(tarefa.id)}
                    aria-label="Excluir tarefa"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}

          </div>

          <footer className="rodape">
            <span>Feito para manter sua rotina em ordem.</span>
            <span>{concluidas} de {tarefas.length} concluídas</span>
          </footer>

        </section>

        <p className="creditos">MINHAS TAREFAS • NEXT.JS + REACT</p>

      </div>
    </main>
  );
}
