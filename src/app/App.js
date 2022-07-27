import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import DevE from "./pages/devAdd";
import Home from './pages/Home'
export default function BasicExample() {
  return (
    <Router>
      <div>
        <nav>
            <div class="nav-wrapper">
            <a href="#" class="brand-logo">Video Game-Test Hova</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li> <Link to="/" >DashBoard</Link></li>
                <li><Link to="/DevE">Agregar Desarrollador</Link></li>
                
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
        </Switch>
      </div>
    </Router>
  );
}
