const Criterio = require("../models/Criterio");

module.exports = {
  async create(nome) {
    if (!nome) {
      throw new Error("Nome não especificado");
    }

    return await Criterio.new(nome);
  },
};
