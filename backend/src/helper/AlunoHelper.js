const connection = require('../database/connection');
const { asyncFilter } = require('./asyncFilter');

module.exports = {
  async alunosNotFound(time) {
    return await asyncFilter(time, async (item) => {
      const res = await connection("alunos as a")
        .select(["a.id", "a.matricula", "a.nome", "c.nome as curso"])
        .join("cursos as c", "a.curso", "c.id")
        .where("a.id", "=", item.id);
      return res.length == 0;
    });
  },

  countUniqueCursos(time) {
    return [...new Set(time.map(item => item.curso))].length;
  },

  async validateTimeSugerido(aluno, time) {

    if(time.length > 4) {
        throw new Error("O máximo de alunos em um time é 5, contando com o criador");
    }

    if(module.exports.countUniqueCursos(time).length < 2) {
        throw new Error("O time deve ter alunos de pelo menos 2 cursos diferentes");
    }
    
    const notFound = await module.exports.alunosNotFound(time);
    if(notFound.length > 0) {
        throw new Error(`Alunos não encontrados: ${notFound.map(item => item.nome).join(", ")}`);
    }

    return true;
  },

  async validateTimeFinal(time) {

    if(time.length > 5) {
      throw new Error("O máximo de alunos em um time é 5");
    }

    const notFound = await module.exports.alunosNotFound(time);
    if(notFound.length > 0) {
        throw new Error(`Alunos não encontrados: ${notFound.map(item => item.nome).join(", ")}`);
    }

    return true;
  },

  getPayload(aluno, time) {
    const payload = {
        idAluno1: aluno
    }
    time.forEach((e, i) => {
        payload["idAluno" + (i+2)] = time[i].id;
    });
    for(let i = time.length+2; i < 5; i++) {
      payload["idAluno" + i] = null;
    }

    return payload;
  },
};
