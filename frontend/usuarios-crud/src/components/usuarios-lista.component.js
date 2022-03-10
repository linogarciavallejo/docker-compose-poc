import { Component } from "react";
import UsuarioDataService from "../services/usuario.service";
import { Link } from "react-router-dom";
export default class UsuariosLista extends Component {
  constructor(props) {
    super(props);
    this.onChangeBuscarUsuario = this.onChangeBuscarUsuario.bind(this);
    this.recuperarUsuarios = this.recuperarUsuarios.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setUsuarioActivo = this.setUsuarioActivo.bind(this);
    // this.removeAllusuarios = this.removeAllusuarios.bind(this);
    this.buscarUsuario = this.buscarUsuario.bind(this);
    this.state = {
      usuarios: [],
      currentUsuario: null,
      currentIndex: -1,
      buscarUsuario: "",
    };
  }
  componentDidMount() {
    this.recuperarUsuarios();
  }
  onChangeBuscarUsuario(e) {
    const buscarUsuario = e.target.value;
    this.setState({
      buscarUsuario: buscarUsuario,
    });
  }
  recuperarUsuarios() {
    UsuarioDataService.getAll()
      .then((response) => {
        this.setState({
          usuarios: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  refreshList() {
    this.recuperarUsuarios();
    this.setState({
      currentUsuario: null,
      currentIndex: -1,
    });
  }
  setUsuarioActivo(tutorial, index) {
    this.setState({
      currentUsuario: tutorial,
      currentIndex: index,
    });
  }
  //   removeAllusuarios() {
  //     UsuarioDataService.deleteAll()
  //       .then((response) => {
  //         console.log(response.data);
  //         this.refreshList();
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }
  buscarUsuario() {
    UsuarioDataService.findByTitle(this.state.buscarUsuario)
      .then((response) => {
        this.setState({
          usuarios: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    const { buscarUsuario, usuarios, currentUsuario, currentIndex } =
      this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={buscarUsuario}
              onChange={this.onChangeBuscarUsuario}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.buscarUsuario}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista de Usuarios</h4>
          <ul className="list-group">
            {usuarios &&
              usuarios.map((usuario, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setUsuarioActivo(usuario, index)}
                  key={index}
                >
                  {usuario.nombres}
                </li>
              ))}
          </ul>
          {/* <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllusuarios}
          >
            Remove All
          </button> */}
        </div>
        <div className="col-md-6">
          {currentUsuario ? (
            <div>
              <h4>Usuario</h4>
              <div>
                <label>
                  <strong>Nombres:</strong>
                </label>{" "}
                {currentUsuario.nombres}
              </div>
              <div>
                <label>
                  <strong>Apellidos:</strong>
                </label>{" "}
                {currentUsuario.apellidos}
              </div>
              <div>
                <label>
                  <strong>Correo electrónico:</strong>
                </label>{" "}
                {currentUsuario.email}
              </div>
              <Link
                to={"/usuarios/" + currentUsuario.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Por favor haga clic en un Usuario...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
