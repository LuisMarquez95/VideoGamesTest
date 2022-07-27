import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AgregarConsola from "./pages/consoleAdd";
import DevE from "./pages/devAdd";
import AgregarGame from "./pages/gameAdd";
import Home from './pages/Home'
export default function BasicExample() {
  return (
    <Router>
      <div>
        <nav>
            <div className="nav-wrapper">
            <a href="#" className="brand-logo">Video Game-Test Hova</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li> <Link to="/" >DashBoard</Link></li>
                <li><Link to="/DevE">Agregar Desarrollador</Link></li>
                <li><Link to="/AgregarConsola">Agregar Consola</Link></li>
                <li><Link to="/AgregarGame">Video Juegos</Link></li>
            </ul>
            </div>
        </nav>
      

        {}
        <Switch>
          <Route exact path="/" component={Home}>
            <Home />
          </Route>
          <Route path="/DevE" component={DevE}>
            <DevE />
          </Route>
          <Route path="/AgregarConsola" component={AgregarConsola}>
            <AgregarConsola />
          </Route>
          <Route path="/AgregarGame" component={AgregarGame}>
            <AgregarGame />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
