import React, { useState, useEffect } from "react";
import supabase from "../services/supabase";

export default function Servicos() {
  const [servicos, setServicos] = useState([]);

  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");

  // CARREGAR DO SUPABASE
  const carregarServicos = async () => {
    const { data, error } = await supabase
      .from("servicos")
      .select("*");

    if (error) {
      console.error("Erro ao buscar serviços:", error);
      return;
    }

    setServicos(data || []);
  };

  useEffect(() => {
    carregarServicos();
  }, []);

  const cadastrar = () => {
    if (!nome || !valor) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoServico = {
      id: Date.now(), // ID temporário
      nome,
      valor: Number(valor),
    };

    setServicos([...servicos, novoServico]);

    setNome("");
    setValor("");
  };

  return (
    <div>
      <h2>Gestão de Serviços</h2>

      <h3>Novo Serviço</h3>

      <input
        type="text"
        placeholder="Nome do Serviço"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />

      <button onClick={cadastrar}>Cadastrar</button>
      <button onClick={carregarServicos}>Carregar Serviços</button>

      <h3>Serviços Cadastrados</h3>

      {servicos.length === 0 ? (
        <p>Nenhum serviço cadastrado.</p>
      ) : (
        <div>
          {servicos.map((servico) => (
            <div key={servico.id}>
              <p><strong>ID:</strong> {servico.id}</p>
              <p><strong>Nome:</strong> {servico.nome}</p>
              <p><strong>Valor:</strong> R$ {servico.valor}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}