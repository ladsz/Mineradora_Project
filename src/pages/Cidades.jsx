import React, { useState } from 'react';

export default function Cidades() {
  const [cidades, setCidades] = useState([]);

  const [nome, setNome] = useState('');
  const [estado, setEstado] = useState('');

  const cadastrar = () => {
    if (!nome || !estado) {
      alert('Preencha todos os campos!');
      return;
    }

    const novaCidade = {
      id: cidades.length + 1,
      nome,
      estado
    };

    setCidades([...cidades, novaCidade]);
    setNome('');
    setEstado('');
  };

  return (
    <div>
      <h2>Gestão de Cidades</h2>

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
          placeholder="Estado (UF)"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        
        />

        <button onClick={cadastrar}>Cadastrar</button>
      </div>

      
    </div>
  );
}