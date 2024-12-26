import React from 'react';
import DynamicTable from '../Components/Table';


function GerenciaEntrega(){
  const tabela = DynamicTable(URL);
  return(
    <div>
      {tabela}
    </div>

    
  );
};
export default GerenciaEntrega;
