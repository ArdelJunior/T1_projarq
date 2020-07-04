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
    const check = ac.get(time, avaliador);
    if(check) {
      throw new Error("Este time já foi avaliado");
    }
    
    return await ac.new(avaliador, time, avaliacao);
  },
};
