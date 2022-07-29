import { whileStatement } from "babel-types";
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
        <nav className="navbar navbar-expand-lg " style={{"background-color": "#22577E", color: "white" }}>
            <div className="container-fluid">
                <a href="#" className="navbar-brand" style={{color:"white", "font-family": "Montserrat", "font-weight": "bold"}}>VG Hova</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul id="nav-mobile" className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item"> <Link to="/" className="nav-link"  style={{color:"white", "font-family": "Montserrat"}}>Información</Link></li>
                    <li className="nav-item"><Link to="/DevE" className="nav-link" style={{color:"white", "font-family": "Montserrat"}}>Desarrolladores</Link></li>
                    <li className="nav-item"><Link to="/AgregarConsola" className="nav-link" style={{color:"white", "font-family": "Montserrat"}}>Consolas</Link></li>
                    <li className="nav-item"><Link to="/AgregarGame" className="nav-link" style={{color:"white", "font-family": "Montserrat"}}>Video Juegos</Link></li>
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
