import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  let [id_user, setIdUser] = useState('');
  let [password, setPassword] = useState('');
  let [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/login', {id_user,password});
      if (response.status === 200) {
        const { auth, _ } = response.data;
        setError('')
        if(auth === 'opera-entregas'){
          navigate('/gerenciar')
        }else if (auth === 'insere-entregas'){
          navigate('/inserir')
        }else{
          navigate('/')
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Login inválido');
      } else {
        setError('Erro interno no servidor');
      }
    }
  };

    return(
      <div>
        <h2>Logo aqui</h2>
        
        <form onSubmit={handleLogin}>
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '55ch' } }}
            noValidate
            autoComplete="off"
          >
            <TextField id="id_user" label="Usuário" variant="outlined" onChange={(e) => setIdUser(e.target.value)} required/><br></br>
            <TextField id="password" label="Senha" variant="outlined" onChange={(e) => setPassword(e.target.value)} required/><br></br>
          </Box>
          {error && <p>{error}</p>}<br></br>
          <Button variant="contained" type='submit'>Entrar</Button>
        </form>
      </div>
    );
};

export default HomePage;
