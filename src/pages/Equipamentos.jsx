import React, { useState, useEffect } from "react";
import supabase from "../services/supabase";

export default function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");

  // CARREGAR DO SUPABASE
  const carregarEquipamentos = async () => {
    const { data, error } = await supabase
      .from("equipamentos")
      .select("*");

    if (error) {
      console.error("Erro ao buscar equipamentos:", error);
      return;
    }

    setEquipamentos(data || []);
  };

  useEffect(() => {
    carregarEquipamentos();
  }, []);

  // CADASTRAR NO SUPABASE
  const cadastrar = async () => {
    if (!id || !nome || !setor) {
      alert("Preencha todos os campos!");
      return;
    }

    const { error } = await supabase
      .from("equipamentos")
      .insert([
        {
          id: Number(id),
          nome,
          setor,
        },
      ]);

    if (error) {
      console.error("Erro ao cadastrar:", error);
      alert(error.message);
      return;
    }

    setId("");
    setNome("");
    setSetor("");

    carregarEquipamentos();
  };

  return (
    <div>
      <h2>Gestão de Equipamentos</h2>

      <div>
        <h3>Novo Equipamento</h3>

        <input
          type="number"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          type="text"
          placeholder="Nome do Equipamento"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Setor"
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
        />

        <button onClick={cadastrar}>Cadastrar</button>

        <button
          onClick={carregarEquipamentos}
          style={{ marginLeft: "10px" }}
        >
          Carregar Equipamentos
        </button>
      </div>

      <div>
        <h3>Equipamentos Cadastrados</h3>

        {equipamentos.length === 0 ? (
          <p>Nenhum equipamento encontrado.</p>
        ) : (
          equipamentos.map((eq) => (
            <div key={eq.id}>
              <p><strong>ID:</strong> {eq.id}</p>
              <p><strong>Nome:</strong> {eq.nome}</p>
              <p><strong>Setor:</strong> {eq.setor}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}