const Administrador = require("../models/Administrador");
const Avaliador = require("../models/Avaliador");
const Aluno = require("../models/Aluno");

module.exports = {
  create(role) {
    switch(role) {
      case "administrador":
        return new Administrador();
      case "avaliador":
        return new Avaliador();
      case "aluno":
        return new Aluno();
      default:
        throw new Error("Tipo de pessoa não existente");
    }
  }
}