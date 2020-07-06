const PessoaFactory = require("./PessoaFactory");
const Avaliador = require("../models/Avaliador");

module.exports = class AvaliadorFactory extends PessoaFactory {
  constructor() {
    super();
  }

  createPessoa() {
    return new Avaliador();
  }
}