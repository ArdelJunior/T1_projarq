const Aluno = require("../models/Aluno");
const Curso = require("../models/Curso");

module.exports = {
  async create(matricula, nome, curso, email, password) {
    if (!matricula) {
      throw new Error("Matrícula não inserida");
    }
    if (!nome) {
      throw new Error("Nome não especificado");
    }
    if (!curso) {
      throw new Error("Curso não especificado");
    }
    if (!email) {
      throw new Error("E-mail não especificado");
    }
    if (!password) {
      throw new Error("Senha não inserida");
    }

    const exists = await Aluno.getByMatricula(matricula);
    if(exists) {
      throw new Error("Este aluno já existe");
    }

    let idCurso;

    try {
      const c = await Curso.get(curso);
      idCurso = c.id;
    } catch (err) {
      throw new Error(`Curso ${curso} não encontrado`);
    }

    return await Aluno.new(matricula, nome, idCurso, email, password);
  },
};
