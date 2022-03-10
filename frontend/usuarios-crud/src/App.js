import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Routes,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import UsuariosLista from "./components/usuarios-lista.component";
import AgregarUsuario from "./components/agregar-usuario.component";
import Usuario from "./components/usuario.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/usuarios" className="navbar-brand">
            Usuarios CRUD
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/usuarios"} className="nav-link">
                Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Agregar
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route exact path="/" element={<UsuariosLista />} />
            <Route exact path="/usuarios" element={<UsuariosLista />} />
            <Route exact path="/add" element={<AgregarUsuario />} />
            <Route path="/usuarios/:id" element={<Usuario />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
