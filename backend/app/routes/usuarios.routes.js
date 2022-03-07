module.exports = (app) => {
  const usuarios = require("../controllers/usuarios.controller.js");

  var router = require("express").Router();

  // Crear un nuevo Usuario
  router.post("/", usuarios.create);

  // Recuperar todos los Usuarios
  router.get("/", usuarios.findAll);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", tutorials.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", tutorials.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", tutorials.delete);

  // // Delete all Tutorials
  // router.delete("/", tutorials.deleteAll);

  app.use("/api/usuarios", router);
};
