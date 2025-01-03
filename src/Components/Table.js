import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, tableCellClasses } from '@mui/material';


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

export default function DynamicTable({ URL, tipo }) {
  const [tableHead, setTableHead] = useState([]); // Cabeçalho da tabela
  const [tableData, setTableData] = useState([]); // Dados da tabela

  useEffect(() => {
    // Função para buscar os dados do servidor
    const fetchEntregas = async () => {
      try {
        const response = await axios.get(URL);
        const entregas = response.data;

        if (entregas.length > 0) {
          setTableHead([...Object.keys(entregas[0])]);

          // Converte objetos para arrays para exibir na tabela
          const formattedData = entregas.map((entrega) =>
            Object.values(entrega)
          );
          setTableData(formattedData);
        }
      } catch (error) {
        alert('Erro ao buscar entregas:');
      }
    };

    fetchEntregas();
  }, [URL]);

  if(tipo === 'caminhao'){
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {tableHead.map((header, index) => (
              <TableCell key={index} align="center">{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} align="center">
                  {cell}
                </TableCell>
              ))}
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => console.log(`Button clicked for row ${rowIndex}`)}
                >
                  Retirar
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => console.log(`Button clicked for row ${rowIndex}`)}
                >
                  Finalizar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  }else if (tipo ==='operador'){
    return (
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {tableHead.map((header, index) => (
              <TableCell key={index} align="center">{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} align="center">
                  {cell}
                </TableCell>
              ))}
              <TableCell align="center">
                <Select
                  defaultValue=""
                  onChange={(e) => console.log(`Selected option: ${e.target.value} for row ${rowIndex}`)}
                >
                  <MenuItem value=""><em>Selecione</em></MenuItem>
                  <MenuItem value="volkswagen">Volkswagen</MenuItem>
                  <MenuItem value="ford">Ford</MenuItem>
                </Select>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => console.log(`Button clicked for row ${rowIndex}`)}
                >
                  Enviar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>);

  }else if (tipo ==='geral'){
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
      </TableContainer>);
  }
};
