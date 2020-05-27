const { v4: uuid } = require("uuid");
const connection = require("../database/connection");
const Curso = require("./Curso");

module.exports = {
  async list() {
    return await connection("alunos as a")
      .select([
        "a.id",
        "a.matricula",
        "a.nome",
        "c.nome as curso",
        "a.email",
      ])
      .join("cursos as c", "a.curso", "c.id");
  },

  async get(id) {
    return await connection("alunos as a")
      .select([
        "a.id",
        "a.matricula",
        "a.nome",
        "c.nome as curso",
        "a.email",
      ])
      .join("cursos as c", "a.curso", "c.id")
      .where("a.id", "=", id)
      .first();
  },

  async getPassword(id) {
    return await connection("alunos")
      .select("password")
      .where("id", "=", id)
      .first();
  },

  async update(aluno) {
    if (!aluno.id) {
      return;
    }

    return await connection("alunos")
      .where("id", "=", aluno.id)
      .update({ ...aluno });
  },

  async new(matricula, nome, curso, email, password) {
    if (!matricula) {
      throw new Error("Matrícula não inserida");
    }
    if (!nome) {
      throw new Error("Nome não inserido");
    }
    if (!curso) {
      throw new Error("Curso não inserido");
    }
    if (!email) {
      throw new Error("E-mail não inserido");
    }
    if (!password) {
      throw new Error("Senha não inserida");
    }

    const id = uuid();
    let idCurso;

    try {
      c = await Curso.get(curso);
      idCurso = c.id;
    } catch (err) {
      throw new Error(`Curso ${curso} não encontrado`);
    }

    return connection("alunos").insert({
      id,
      matricula,
      nome,
      curso: idCurso,
      email,
      password,
    });
  },
};
