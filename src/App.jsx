import Menu from "./components/menu"
import "./App.css"
import React, { useState } from 'react';
import Inicio from './pages/Inicio';
import Equipamentos from './pages/Equipamentos';
import Servicos from './pages/Servicos';
import Funcionarios from './pages/Funcionarios';
import Cidades from './pages/Cidades';

function App(){
  
  const [pagina, setPagina] = useState("inicio")
 
  return(
      <div>
        <h1>MINERADORA XYZ</h1>
        <Menu setPagina={setPagina}></Menu>
        <hr />
        {pagina === "inicio" && <Inicio/>}

        {pagina === "equipamentos" && <Equipamentos/>}

        {pagina === "servicos" && <Servicos/>}

        {pagina === "cidades" && <Cidades/>}

        {pagina === "funcionarios" && <Funcionarios/>}

      </div>

    )
}

export default App
