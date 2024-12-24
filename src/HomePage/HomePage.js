import { useState } from 'react';
import axios from 'axios';
//require('dotenv').config()
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
          <label htmlFor="id_user">Usuário</label>
          <input
            type="text"
            id="id_user"
            value={id_user}
            onChange={(e) => setIdUser(e.target.value)}
            required
          />
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          {error && <p>{error}</p>}
          <button type='submit'>Entrar</button>
        </form>
      </div>
    );
};

export default HomePage;
