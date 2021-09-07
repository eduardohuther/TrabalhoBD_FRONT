import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch, useRouteMatch } from 'react-router-dom'
import Login from './Pages/Login'
import Cadastrar from './Pages/Cadastrar';
import Consultar from './Pages/Consultar';
import Relatorios from './Pages/Relatorios';

const isAutheticated = () => {
  return localStorage.getItem('usertoken') && localStorage.getItem('cpf') ? true : false
};
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => isAutheticated() ? (<Component{...props} />
  ) : (<Redirect to={{
    pathname: "/login",
    state: { from: props.location }
  }} />
  )} />
);

function App() {
  return (
    <div>
      <div className="App ">
        <div className="container-fluid">
          <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Cadastrar} />
          <PrivateRoute exact path="/consultar" component={Consultar} />
          <PrivateRoute exact path="/relatorios" component={Relatorios} />
          </Switch>
        </div>
      </div>

    </div>
  );
}

export default App;
