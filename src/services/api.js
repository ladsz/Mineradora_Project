export const equipamentoService = {
  listar: async () => {
    return {
      data: [
        { id: 1, nome: "Escavadeira", setor: "Extração" },
        { id: 2, nome: "Britador", setor: "Processamento" }
      ]
    };
  },

  criar: async (equipamento) => {
    console.log("Equipamento cadastrado:", equipamento);
    return { data: equipamento };
  }
};