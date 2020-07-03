const Pessoa = require("./Pessoa");

module.exports = class Administrador extends Pessoa {
  constructor() {
    super("administrador");
  }
}