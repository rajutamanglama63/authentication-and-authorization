import { Switch, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Admin from './pages/AdminPage';
import Todo from './pages/TodoPage';

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/todo" component={Todo} />
      </Switch>
    </div>
  );
}

export default App;
