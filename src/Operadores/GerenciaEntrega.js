import React from 'react';
import DynamicTable from '../Components/Table';


function GerenciaEntrega(){
  const tabela = DynamicTable('http://localhost:5000/user/getall');
  return(
    <div>
      {tabela}
      <p>Teste</p>
    </div>

    
  );
};
export default GerenciaEntrega;
