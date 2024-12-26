import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function DynamicTable(URL){
  const [tableHead, setTableHead] = useState([]); // Cabeçalho da tabela
  const [tableData, setTableData] = useState([]); // Dados da tabela

  useEffect(() => {
    // Função para buscar os dados do servidor
    const fetchEntregas = async () => {
      try {
        const response = await axios.get(URL);
        const entregas = response.data;

        if (entregas.length > 0) {
          // Dinamicamente configura o cabeçalho
          setTableHead(Object.keys(entregas[0]));

          // Converte objetos para arrays para exibir na tabela
          const formattedData = entregas.map((entrega) =>
            Object.values(entrega)
          );
          setTableData(formattedData);
        }
      } catch (error) {
        console.error('Erro ao buscar entregas:', error);
      }
    };

    fetchEntregas();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
          <TableRow>{tableHead.map((header, index) => (<StyledTableCell key={index} align="center">{header}</StyledTableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>{tableData.map((row, rowIndex) => (<StyledTableRow key={rowIndex}>{row.map((cell, cellIndex) => (<StyledTableCell key={cellIndex} align="center">
        {cell}</StyledTableCell>))}</StyledTableRow>))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};