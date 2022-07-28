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
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a href="#" className="navbar-brand">Video Game-Test Hova</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul id="nav-mobile" className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item"> <Link to="/" className="nav-link" >DashBoard</Link></li>
                    <li className="nav-item"><Link to="/DevE" className="nav-link">Agregar Desarrollador</Link></li>
                    <li className="nav-item"><Link to="/AgregarConsola" className="nav-link">Agregar Consola</Link></li>
                    <li className="nav-item"><Link to="/AgregarGame" className="nav-link">Video Juegos</Link></li>
                </ul>
                </div>
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
