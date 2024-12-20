import { useState } from 'react';
import axios from 'axios';

async function handleLogin(user, psswrd){
  try{
    await axios.post('http://localhost:3000/user/login', {id_user,password}).then((response) => {
      if (response.status === 200) {
        const { auth, token } = response.data;
        console.log('Auth:', auth);
        console.log('Token:', token);
        
      }
    })
    .catch(erro => {
      erro = 'Login inválido'
    });
  }catch{
      erro = 'Erro interno no servidor'
  }
  
}

function HomePage() {
  const [id_user, setIdUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
    return(
      <div>
      <h2>Logo aqui</h2>
      <div>
        <label htmlFor="id_user">Usuário</label>
        <input
          type="text"
          id="id_user"
          value={id_user}
          onChange={(e) => setIdUser(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p>{error}</p>}
      <button onClick={handleLogin(id_user, password)}>Entrar</button>
      </div>
    );
}

export default HomePage;
