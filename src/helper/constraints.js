const Avaliacao = require("../models/Avaliacao");

module.exports = {
  checkCursos(alunos) {
    const check = [...new Set(alunos.map((a) => a.curso))];
    if (check.length < 2) {
      throw new Error("Devem ser adicionados alunos de pelo menos 2 cursos diferentes");
    }
    return true;
  },

  async checkAvaliacaoAlreadyExists(time, avaliador) {
    const ac = new Avaliacao();
    const check = await ac.get(time, avaliador);
    if (check && check.length) {
      throw new Error("Este time já foi avaliado");
    }

    return true;
  },

  checkAvaliacoesTime(time) {
    if(!time.avaliacoes) {
      throw new Error("Não há avaliações");
    }

    if(time.avaliacoes.length < 3) {
      throw new Error("São necessárias pelo menos 3 avaliações");
    }

    return true;
  }
}