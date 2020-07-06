const TimeSugerido = require("../models/TimeSugerido");

module.exports = {
  async create(criador, alunos) {
    if (!criador) {
      throw new Error("Criador não especificado");
    }
    const exists = await TimeSugerido.getByCriador(criador);
    if(exists) {
      throw new Error("Já existe um time criado por este aluno");
    }
    return await TimeSugerido.new(criador, alunos);
  },
};
