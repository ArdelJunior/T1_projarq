const Curso = require("../models/Curso");

module.exports = {
  async create(nome) {
    if (!nome) {
      throw new Error("Nome não especificado");
    }
    
    return await Curso.new(nome);
  },
};
