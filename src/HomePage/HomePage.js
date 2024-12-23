import { useState } from 'react';
import axios from 'axios';

async function handleLogin(user, psswrd){
  try{
    await axios.post('http://localhost:3000/user/login', {user,psswrd}).then((response) => {
      if (response.status === 200) {
        const { auth, token } = response.data;
        return token
      }
    })
    .catch(erro => {
      return erro = 'Login inválido'
    });
  }catch{
      return erro = 'Erro interno no servidor'
  }
  
}

function HomePage() {
  let [id_user, setIdUser] = useState('');
  let [password, setPassword] = useState('');
  let [error, setError] = useState('');
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
