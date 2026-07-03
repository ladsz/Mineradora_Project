import React, { useState, useEffect } from 'react';
import supabase from "../services/supabase";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [salario, setSalario] = useState('');

  // CARREGAR DO SUPABASE
  const carregarFuncionarios = async () => {
    const { data, error } = await supabase
      .from("funcionarios")
      .select("*");

    if (error) {
      console.error("Erro ao carregar funcionários:", error);
      return;
    }

    setFuncionarios(data || []);
  };

  // CARREGA AO ABRIR A PÁGINA
  useEffect(() => {
    carregarFuncionarios();
  }, []);

  // CADASTRAR NO SUPABASE
  const cadastrar = async () => {
    if (!id || !nome || !cargo || !salario) {
      alert("Preencha todos os campos!");
      return;
    }

    const { error } = await supabase
      .from("funcionarios")
      .insert([
        {
          id: Number(id),
          nome,
          cargo,
          salario: Number(salario),
        },
      ]);

    if (error) {
      console.error("Erro ao cadastrar:", error);
      alert(error.message);
      return;
    }

    setId('');
    setNome('');
    setCargo('');
    setSalario('');

    carregarFuncionarios();
  };

  return (
    <div>
      <h2>Gestão de Funcionários</h2>

      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>Novo Funcionário</h3>

        <input
          type="number"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ marginRight: '10px' }}
        />

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ marginRight: '10px' }}
        />

        <input
          type="text"
          placeholder="Cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          style={{ marginRight: '10px' }}
        />

        <input
          type="number"
          placeholder="Salário"
          value={salario}
          onChange={(e) => setSalario(e.target.value)}
          style={{ marginRight: '10px' }}
        />

        <button onClick={cadastrar}>Cadastrar</button>

        <button
          onClick={carregarFuncionarios}
          style={{ marginLeft: '10px' }}
        >
          Carregar Funcionários
        </button>
      </div>

      <div>
        <h3>Funcionários Cadastrados</h3>

        {funcionarios.length === 0 ? (
          <p>Nenhum funcionário encontrado.</p>
        ) : (
          funcionarios.map((f) => (
            <div
              key={f.id}
              style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}
            >
              <p><strong>ID:</strong> {f.id}</p>
              <p><strong>Nome:</strong> {f.nome}</p>
              <p><strong>Cargo:</strong> {f.cargo}</p>
              <p><strong>Salário:</strong> R$ {f.salario}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}