import React, { useState, useEffect } from 'react';
import supabase from "../services/supabase";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);

  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [salario, setSalario] = useState('');

  // 🔄 CARREGAR DO BANCO
  const carregarFuncionarios = async () => {
    const { data, error } = await supabase
      .from("funcionarios")
      .select("*");

    if (error) {
      console.error("Erro ao carregar:", error);
      return;
    }

    setFuncionarios(data || []);
  };

  // 📥 CARREGA AO ABRIR A PÁGINA
  useEffect(() => {
    carregarFuncionarios();
  }, []);

  // ➕ CADASTRAR NO SUPABASE
  const cadastrar = async () => {
    if (!nome || !cargo || !salario) {
      alert("Preencha todos os campos!");
      return;
    }

    const { error } = await supabase
      .from("funcionarios")
      .insert([
        {
          nome,
          cargo,
          salario: Number(salario)
        }
      ]);

    if (error) {
      console.error("Erro ao cadastrar:", error);
      return;
    }

    setNome('');
    setCargo('');
    setSalario('');

    carregarFuncionarios(); // atualiza lista
  };

  return (
    <div>
      <h2>Gestão de Funcionários</h2>

      {/* FORMULÁRIO */}
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>Novo Funcionário</h3>

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
      </div>

      {/* LISTA */}
      <div>
        <h3>Funcionários Cadastrados</h3>

        {funcionarios.length === 0 ? (
          <p>Nenhum funcionário encontrado.</p>
        ) : (
          funcionarios.map((f) => (
            <div key={f.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
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