const PessoaFactory = require("./PessoaFactory");
const Administrador = require("../models/Administrador");

module.exports = class AdministradorFactory extends PessoaFactory {
  constructor() {
    super();
  }

  createPessoa() {
    return new Administrador();
  }
}