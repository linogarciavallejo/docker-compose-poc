// const sql = require("./db.js");

// const Usuarios = function (usuario) {
//   this.nombres = usuario.nombres;
//   this.apellidos = usuario.apellidos;
//   this.email = usuario.email;
// };

// Usuarios.getAll = (usuario, result) => {
//   let query = "SELECT * FROM usuarios";

//   if (usuario) {
//     query += ` WHERE Nombres LIKE '%${usuario}%' OR Apellidos LIKE '%${usuario}%'`;
//   }

//   sql.query(query, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("usuarios: ", res);
//     result(null, res);
//   });
// };

// module.exports = Usuarios;

module.exports = (sequelize, Sequelize) => {
  const Usuarios = sequelize.define("usuario", {
    nombres: {
      type: Sequelize.STRING,
    },
    apellidos: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
  });

  return Usuarios;
};
