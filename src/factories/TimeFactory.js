const Time = require("../models/Time");

module.exports = {
  async create(criador, nome, alunos) {
    if (!criador) {
      throw new Error("Criador não especificado");
    }
    if (!nome) {
      throw new Error("Nome não especificado");
    }
    const time = new Time();
    return await time.new(criador, nome, alunos);
  },
};
