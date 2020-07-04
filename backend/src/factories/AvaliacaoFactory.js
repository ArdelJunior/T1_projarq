const Avaliacao = require("../models/Avaliacao");

module.exports = {
  async create(avaliador, time, avaliacao) {
    if (!avaliador) {
      throw new Error("Avaliador não especificado");
    }

    if (!time) {
      throw new Error("Time não especificado");
    }

    if (!avaliacao) {
      throw new Error("Avaliação não especificada");
    }

    const ac = new Avaliacao();
    return await ac.new(avaliador, time, avaliacao);
  },
};
