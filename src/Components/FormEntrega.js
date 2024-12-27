import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '55ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="id_pedido" label="Número Pedido" variant="outlined" /><br></br>
      <TextField id="cliente" label="Cliente" variant="outlined" /><br></br>
      <TextField id="observacao" label="Observações (opcional)" variant="outlined" />
    </Box>
  );
}

function RadioButtonGroup(tipo) {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  if (tipo ==='vendedores'){
    return (<FormControl>
    <FormLabel id="vendedor-radiobutton">Vendedor</FormLabel>
    <RadioGroup
      aria-labelledby="demo-controlled-radio-buttons-group"
      name="controlled-radio-buttons-group"
      value={value}
      onChange={handleChange}
    >
      <FormControlLabel value="terezinha" control={<Radio />} label="Terezinha" />
      <FormControlLabel value="carlos" control={<Radio />} label="Carlos" />
      <FormControlLabel value="evandro" control={<Radio />} label="Evandro" />
      <FormControlLabel value="eliane" control={<Radio />} label="Eliane" />
      <FormControlLabel value="elcir" control={<Radio />} label="Elcir" />
    </RadioGroup>
  </FormControl>);

  }else if (tipo==='periodos'){
    return(<FormControl>
    <FormLabel id="periodos-radiobutton">Período</FormLabel>
    <RadioGroup
      aria-labelledby="demo-controlled-radio-buttons-group"
      name="controlled-radio-buttons-group"
      value={value}
      onChange={handleChange}
    >
      <FormControlLabel value="manha" control={<Radio />} label="Manhã" />
      <FormControlLabel value="tarde" control={<Radio />} label="Tarde" />
      
    </RadioGroup>
  </FormControl>);
  }
}

function ButtonGroup(tipo){
  if(tipo === 'cadastrar'){
    return(
      <Stack direction="row" spacing={10}>
            <Button variant="contained">
                Cadastrar
            </Button>
            <Button variant="contained">
                Sair
            </Button>
            </Stack>
    );
  }else if (tipo ==='alterar'){
    <Stack direction="row" spacing={10}>
            <Button variant="outlined">
                Atualizar
            </Button>
            <Button variant="contained">
                Sair
            </Button>
            </Stack>
  }
}

function BairroSelect() {
  const options = ['Option 1', 'Option 2'];
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      <br />
      <Select
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="bairro-select"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Bairro" />}
      />
    </div>
  );
}
export default function FormEntrega(tipo){
  const vendedores = RadioButtonGroup('vendedores');
  const periodos = RadioButtonGroup('periodos');
  const button = ButtonGroup(tipo);
    return(
        <div>
            <BasicTextFields />
            {vendedores}
            <BairroSelect />
            {periodos}
            {button}
        </div>
    );

};