import React, { useState, useEffect } from "react";
import supabase from "../services/supabase";

export default function Cidades() {
  const [cidades, setCidades] = useState([]);

  const [nome, setNome] = useState("");
  const [estado, setEstado] = useState("");

  // 📥 CARREGAR CIDADES
  const carregarCidades = async () => {
    const { data, error } = await supabase
      .from("cidades")
      .select("*");

    if (error) {
      console.error("Erro ao buscar cidades:", error);
      return;
    }

    setCidades(data || []);
  };

  // 🔄 CARREGA AO ABRIR A PÁGINA
  useEffect(() => {
    carregarCidades();
  }, []);

  // ➕ CADASTRAR CIDADE
  const cadastrar = async () => {
    if (!nome || !estado) {
      alert("Preencha todos os campos!");
      return;
    }

    const { error } = await supabase
      .from("cidades")
      .insert([{ nome, estado }]);

    if (error) {
      console.error("Erro ao cadastrar:", error);
      return;
    }

    setNome("");
    setEstado("");

    carregarCidades();
  };

  return (
    <div>
      <h2>Gestão de Cidades</h2>

      {/* FORMULÁRIO */}
      <div>
        <h3>Nova Cidade</h3>

        <input
          type="text"
          placeholder="Nome da Cidade"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        />

        <button onClick={cadastrar}>Cadastrar</button>
        
      </div>

      {/* LISTA */}
      <div>
        <h3>Cidades Cadastradas</h3>

        {cidades.length === 0 ? (
          <p>Nenhuma cidade cadastrada.</p>
        ) : (
          cidades.map((cidade) => (
            <div key={cidade.id}>
              <p><strong>ID:</strong> {cidade.id}</p>
              <p><strong>Nome:</strong> {cidade.nome}</p>
              <p><strong>Estado:</strong> {cidade.estado}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}