const Avaliacao = require("../models/Avaliacao");

module.exports = {
  async create(idAvaliador, idTime, avaliacoes) {
    if (!idAvaliador) {
      throw new Error("Avaliador não especificado");
    }

    if (!idTime) {
      throw new Error("Time não especificado");
    }

    if (!avaliacoes) {
      throw new Error("Avaliações não especificadas");
    }

    return await Avaliacao.new(idAvaliador, idTime, avaliacoes);
  },
};
