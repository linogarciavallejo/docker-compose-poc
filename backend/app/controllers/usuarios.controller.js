const db = require("../models");
const Usuarios = db.Usuarios;
const Op = db.Sequelize.Op;

// Crear un nuevo Usuario
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombres) {
    res.status(400).send({
      message: "Campo Nombres es un dato obligatorio!",
    });
    return;
  }
  if (!req.body.apellidos) {
    res.status(400).send({
      message: "Campo Apellidos es un dato obligatorio!",
    });
    return;
  }

  // Crear un Usuario
  const usuario = {
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    email: req.body.email,
  };

  // Guardar Usuario en la Base de Datos
  Usuarios.create(usuario)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrió un error intentando crear un Usuario.",
      });
    });
};

// Recuperar un Usuario a través de su id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Usuarios.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error recuperando el Usuario con el id=${id}`,
      });
    });
};

// Recuperar todos los Usuarios
exports.findAll = (req, res) => {
  const usuario = req.query.usuario;
  var condition = usuario ? { nombres: { [Op.like]: `%${usuario}%` } } : null;

  Usuarios.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Ocurrió un error intentando recuperar todos los usuarios.",
      });
    });
};

// Actualizar un Usuario por medio del id en el request
exports.update = (req, res) => {
  const id = req.params.id;

  Usuarios.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "El Usuario fue actualizado exitosamente.",
        });
      } else {
        res.send({
          message: `No se puede actualizar el Usuario con id=${id}. Talvez el Usuario no fue encontrado o req.body está vacío!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error actualizando el Usuario con el id=${id}`,
      });
    });
};

// Eliminar un Usuario con el id especificado en el request
exports.delete = (req, res) => {
  const id = req.params.id;

  Usuarios.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "El Usuario fue eliminado exitosamente.",
        });
      } else {
        res.send({
          message: `No se puede eliminar el Usuario con id=${id}. Talvez el Usuario no fue encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "No se puede eliminar el Usuario con id=" + id,
      });
    });
};
