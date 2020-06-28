const Avaliador = require("../models/Avaliador");

module.exports = {
  async create(nome, email, password) {
    if (!nome) {
      throw new Error("Nome não especificado");
    }
    if (!email) {
      throw new Error("E-mail não especificado");
    }
    if (!password) {
      throw new Error("Senha não inserida");
    }

    return await Avaliador.new(nome, email, password);
  },
};
