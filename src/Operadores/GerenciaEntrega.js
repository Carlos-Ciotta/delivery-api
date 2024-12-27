import React from 'react';
import DynamicTable from '../Components/Table';
import MenuBar from '../Components/MenuBar';

function GerenciaEntrega(){
  const tabela_vw = DynamicTable('http://localhost:5000/user/getall', 'caminhao');
  const tabela_ford = DynamicTable('http://localhost:5000/user/getall', 'caminhao');
  const tabela_geral = DynamicTable('http://localhost:5000/user/getall', 'operador');
  return(
    <div>
      <MenuBar />
      {tabela_vw}
      {tabela_ford}
      {tabela_geral}
      <p>Teste</p>
    </div>

    
  );
};
export default GerenciaEntrega;
