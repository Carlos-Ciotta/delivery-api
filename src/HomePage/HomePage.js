import GerenciaEntrega from "../Operadores/GerenciaEntrega";
import InsereEntrega from "../Operadores/InsereEntrega";

function LoginForm(){
    return(
        <div className="login-form">
            {/* Campo de input */}
            <input 
              type="text" 
              id="operador" 
              placeholder="Usuário"
            />
            <input 
              type="password" 
              id="password" 
              placeholder="Senha"
            />
            <button>Login</button>
        </div>
    );
}

function isLoggedIn(){
  let user;
  if(user && user === 'gerencia-entrega'){
    return <GerenciaEntrega />
  }else if (user && user =='insere-entrega'){
    return <InsereEntrega />
  }else{
    return <LoginForm />;
  }
}
function HomePage() {
  let content = isLoggedIn()
    return(
        <div className="home-page">
          {content}
        </div>
    );
}

export default HomePage;
