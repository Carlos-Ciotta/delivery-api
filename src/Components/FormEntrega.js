import React from "react";
import { Button, Radio, RadioGroup, FormControlLabel,FormControl, FormLabel, Box, TextField, Autocomplete } from '@mui/material'

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
            <Button variant="contained">
                Cadastrar
            </Button>
    );
  }else if (tipo === 'alterar'){
    return (
            <Button variant="contained">
                Alterar
            </Button>
    );
  }
}

function BairroSelect() {
  const options =['Esplanada','Palmital','São Vendelino','Agua Amarela','Seminário','Quedas do Palmital','Universitário','Linha das Palmeira',
                  'Linha São Rafael','Lajeado Veríssimo','Linha São Francisco','Linha Pequena','Dom José Gomes','Aldeia Indígena Condá','Santa Maria','Santo Antônio','Saic',
                  'Maria Goretti','Jardim Itália','São Pedro','Efapi','São Cristóvão','Trevo','Passo dos Fortes','Pinheirinho','Expoente','Monte Castelo','Cordilheira Alta',
                  'Monte Alegre','Centro','Ludovico Silvestre','Bom Pastor','Caic','Lider','Vila Real','Aeroporto','Passo dos Ferreira','Marechal Bormann','Parque das Palmeiras',
                  'Assentamento Dom José Gomes','Presidente Médici'];
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      <br />
      <Autocomplete
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