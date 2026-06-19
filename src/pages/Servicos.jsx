import React, { useState } from 'react';

export default function Servicos() {
  const [servicos, setServicos] = useState([]);

  
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');

  const cadastrar = () => {
    if (!nome || !valor) {
      alert('Preencha todos os campos!');
      return;
    }

    const novoServico = {
      id: servicos.length+1,
      nome,
      valor: Number(valor)
    };

    setServicos([...servicos, novoServico]);
    setNome('');
    setValor('');
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

      <h3>Serviços Cadastrados</h3>

      <ul>
        {servicos.map((servico) => (
          <li key={servico.id}>
            ID: {servico.id} | Nome: {servico.nome} | Valor: R$ {servico.valor}
          </li>
        ))}
      </ul>
    </div>
  );
}