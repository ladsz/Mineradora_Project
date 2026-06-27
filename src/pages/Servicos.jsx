import React, { useState, useEffect } from "react";
import supabase from "../services/supabase";

export default function Servicos() {
  const [servicos, setServicos] = useState([]);

  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");

  // 📥 CARREGAR DO BANCO
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

  // 🔄 CARREGA AO ABRIR
  useEffect(() => {
    carregarServicos();
  }, []);

  // ➕ INSERIR NO BANCO (FUNCIONANDO)
  const cadastrar = async () => {
    if (!nome || !valor) {
      alert("Preencha todos os campos!");
      return;
    }

    const { error } = await supabase
      .from("servicos")
      .insert([
        {
          nome: nome,
          valor: Number(valor),
        },
      ]);

    if (error) {
      console.error("Erro ao cadastrar:", error);
      return;
    }

    setNome("");
    setValor("");

    carregarServicos(); // atualiza lista
  };

  return (
    <div>
      <h2>Gestão de Serviços</h2>

      {/* FORMULÁRIO */}
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

      {/* LISTA */}
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