import React, { useState, useEffect } from "react";
import supabase from "../services/supabase";

export default function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");

  // ✅ CARREGAR DADOS
  const carregarEquipamentos = async () => {
    const { data, error } = await supabase
      .from("equipamentos")
      .select("*");

    if (error) {
      console.error("Erro ao buscar equipamentos:", error);
      return;
    }

    const formatted = (data || []).map((item) => ({
      ...item,
      nome: Array.isArray(item.nome) ? item.nome[0] : item.nome,
      setor: Array.isArray(item.setor) ? item.setor[0] : item.setor,
    }));

    setEquipamentos(formatted);
  };

  // ✅ CARREGA AO ABRIR A PÁGINA
  useEffect(() => {
    carregarEquipamentos();
  }, []);

  // ✅ CADASTRAR NO SUPABASE
  const cadastrar = async () => {
    if (!nome || !setor) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      console.log("Cadastrando equipamento:", { nome, setor });
      const { data, error } = await supabase
        .from("equipamentos")
        .insert([{ nome: [nome], setor: [setor] }])
        .select();

      if (error) {
        console.error("Erro ao cadastrar equipamento:", error);
        alert(`Erro ao cadastrar: ${error.message}`);
        return;
      }

      if (!data || data.length === 0) {
        alert("Equipamento cadastrado, mas não foi possível recuperar os dados.");
        carregarEquipamentos();
        setNome("");
        setSetor("");
        return;
      }

      const formattedData = data.map((item) => ({
        ...item,
        nome: Array.isArray(item.nome) ? item.nome[0] : item.nome,
        setor: Array.isArray(item.setor) ? item.setor[0] : item.setor,
      }));

      setEquipamentos((prev) => [...prev, ...formattedData]);
      setNome("");
      setSetor("");
    } catch (error) {
      console.error("Erro inesperado ao cadastrar:", error);
      alert("Erro inesperado ao cadastrar equipamento. Veja o console do navegador.");
    }
  };

  return (
    <div>
      <h2>Gestão de Equipamentos</h2>

      {/* FORMULÁRIO */}
      <div>
        <h3>Novo Equipamento</h3>

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

      </div>

      {/* LISTA */}
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