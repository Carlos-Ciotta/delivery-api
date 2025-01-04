import React from 'react';
import DynamicTable from '../Components/Table';
import MenuBar from '../Components/MenuBar';

function GerenciaEntrega(){
  return(
    <div>
      <MenuBar />
      <DynamicTable URL={'http://localhost:5000/entregas/getusuario/usuario'} tipo={'caminhao'}/>
      <DynamicTable URL={'http://localhost:5000/entregas/getusuario/usuario'} tipo={'caminhao'}/>
      <DynamicTable URL={'http://localhost:5000/entregas/getusuario/usuario'} tipo={'operador'}/>
      <p>Teste</p>
    </div>

    
  );
};
export default GerenciaEntrega;
