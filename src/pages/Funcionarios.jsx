import React, { useState } from 'react';

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);

  
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [salario, setSalario] = useState('');

  const cadastrar = () => {
    if (!nome || !cargo || !salario) {
      alert('Preencha todos os campos!');
      return;
    }

    const novoFuncionario = {
    id: funcionarios.length + 1,
    nome,
    cargo,
    salario: Number(salario)
    };

    setFuncionarios([...funcionarios, novoFuncionario]);

    setNome('');
    setCargo('');
    setSalario('');
  };

  return (
    <div>
      <h2>Gestão de Funcionários</h2>

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
    </div>
  );
}