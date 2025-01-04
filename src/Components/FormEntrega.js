import {React, useState} from "react";
import axios from "axios";
import { Button, Radio, RadioGroup, FormControlLabel,FormControl, FormLabel, Box, TextField, Autocomplete } from '@mui/material'
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function FormEntrega({tipo}){
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    id_pedido: "",
    cliente: "",
    observacao: "",
    bairro: "",
    vendedor: "",
    periodo: "",
    data_entrega:""
  });

  // Função para atualizar os valores do formulário
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({...prevData,[name]: value,}));
  };

  const handleDateChange = (newValue) => {
    handleChange({
      target: {
        name: "data_entrega",
        value: dayjs(newValue).format("DD-MM-YYYY"),
      },
    });
  };
  // Função para lidar com o Autocomplete
  const handleAutocompleteChange = (field, value) => {
    setFormData((prevData) => ({...prevData,[field]: value}));
  };

  // Função para enviar os dados via POST
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/entregas", formData);
      alert("Dados enviados com sucesso!");
    } catch (error) {
      alert("Falha ao enviar os dados.", error);
    }
  };

  const handleAlter = async () => {
    try {
      await axios.patch(`http://localhost:5000/entregas/:tipo/:id_entrega${formData.id_pedido}`)
      alert("Dados alterados");
    } catch (error) {
      alert("Falha ao alterar os dados.", error);
    }
  };

  const handleGetById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/entregas/${formData.id_pedido}`);
      const data = response.data;

      // Preenche os campos com os dados recebidos
      setFormData({
        id_pedido: data.id_pedido || formData.id_pedido,
        cliente: data.cliente || "",
        observacao: data.observacao || "",
        bairro: data.bairro || "",
        vendedor: data.vendedor || "",
        periodo: data.periodo || "",
        data_entrega: data.data_entrega || ""
      });

      // Desabilita o campo ID
      setIdPedidoDisabled(true);
    } catch (error) {
      console.error("Erro ao buscar o pedido:", error);
      alert("Não foi possível encontrar o pedido.");
    }
  };
  const [idPedidoDisabled, setIdPedidoDisabled] = useState(false);
  const options = ['Esplanada','Palmital','São Vendelino','Agua Amarela','Seminário','Quedas do Palmital','Universitário','Linha das Palmeira',
    'Linha São Rafael','Lajeado Veríssimo','Linha São Francisco','Linha Pequena','Dom José Gomes','Aldeia Indígena Condá','Santa Maria','Santo Antônio','Saic',
    'Maria Goretti','Jardim Itália','São Pedro','Efapi','São Cristóvão','Trevo','Passo dos Fortes','Pinheirinho','Expoente','Monte Castelo','Cordilheira Alta',
    'Monte Alegre','Centro','Ludovico Silvestre','Bom Pastor','Caic','Lider','Vila Real','Aeroporto','Passo dos Ferreira','Marechal Bormann','Parque das Palmeiras',
    'Assentamento Dom José Gomes','Presidente Médici'];
    return(
      <div>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "55ch" } }}
        noValidate
        autoComplete="off"
      >
        {tipo === 'alterar' && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            id="id_pedido"
            label="Número Pedido"
            variant="outlined"
            name="id_pedido"
            value={formData.id_pedido}
            onChange={handleChange}
            disabled={idPedidoDisabled}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleGetById}
            disabled={idPedidoDisabled}
            sx={{ marginLeft: 1 }}
          >
            Buscar
          </Button>
          </Box>)}
        {tipo === 'cadastrar' &&(
          <TextField
          id="id_pedido"
          label="Número Pedido"
          variant="outlined"
          name="id_pedido"
          value={formData.id_pedido}
          onChange={handleChange}
        />
        )}
        
        <TextField
          id="cliente"
          label="Cliente"
          variant="outlined"
          name="cliente"
          value={formData.cliente}
          onChange={handleChange}
        />
        <TextField
          id="observacao"
          label="Observações (opcional)"
          variant="outlined"
          name="observacao"
          value={formData.observacao}
          onChange={handleChange}
        />
      </Box>
      <FormControl>
        <FormLabel>Vendedor</FormLabel>
        <RadioGroup
          name="vendedor"
          value={formData.vendedor}
          onChange={handleChange}
        >
          <FormControlLabel value="terezinha" control={<Radio />} label="Terezinha" />
          <FormControlLabel value="carlos" control={<Radio />} label="Carlos" />
          <FormControlLabel value="evandro" control={<Radio />} label="Evandro" />
          <FormControlLabel value="eliane" control={<Radio />} label="Eliane" />
          <FormControlLabel value="elcir" control={<Radio />} label="Elcir" />
        </RadioGroup>
      </FormControl>
      <Autocomplete
        value={formData.bairro}
        onChange={(event, newValue) => handleAutocompleteChange("bairro", newValue)}
        id="bairro-select"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Bairro" />}
      />
      <FormControl>
        <FormLabel>Período</FormLabel>
        <RadioGroup
          name="periodo"
          value={formData.periodo}
          onChange={handleChange}
        >
          <FormControlLabel value="manha" control={<Radio />} label="Manhã" />
          <FormControlLabel value="tarde" control={<Radio />} label="Tarde" />
        </RadioGroup>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Selecione uma data"
          name = "data_entrega"
          value={formData.data_entrega ? dayjs(formData.data_entrega, "DD-MM-YYYY") : null}
          onChange={handleDateChange}
          format="DD-MM-YYYY"
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>

      </FormControl><br></br>
      {tipo === "alterar" && (
        <Button
          variant="outlined"
          onClick={handleAlter}
        >Alterar</Button>)}

      {tipo === "cadastrar" && (
        <Button
          variant="outlined"
          onClick={handleSubmit}
        >Cadastrar</Button>)}
    </div>
    );

};