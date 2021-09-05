import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch, useRouteMatch } from 'react-router-dom'
import Login from './Pages/Login'
import Inicial from './Pages/Inicial';

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
          <PrivateRoute exact path="/" component={Inicial} />
          </Switch>
        </div>
      </div>

    </div>
  );
}

export default App;
