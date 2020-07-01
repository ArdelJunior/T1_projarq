const connection = require("../database/connection");
const { listUnassigned } = require("../controllers/AlunoController");

module.exports = {
  async list() {
    return await connection("alunos as a")
      .select(["a.id", "a.matricula", "a.nome", "c.nome as curso", "a.email"])
      .join("cursos as c", "a.curso", "c.id");
  },

  async listUnassigned() {
    return await connection("alunos as a")
      .select(["a.id", "a.matricula", "a.nome", "c.nome as curso", "a.email"])
      .join("cursos as c", "a.curso", "c.id")
      .leftJoin("alunos_times as at", "a.id", "at.id_aluno")
      .leftJoin("times as t", "t.id", "at.id_time")
      .whereNull("at.id");
  },

  async get(id) {
    return await connection("alunos as a")
      .select(["a.id", "a.matricula", "a.nome", "c.nome as curso", "a.email"])
      .join("cursos as c", "a.curso", "c.id")
      .where("a.id", "=", id)
      .first();
  },

  async getByMatricula(matricula) {
    return await connection("alunos as a")
      .select(["a.id", "a.matricula", "a.nome", "c.nome as curso", "a.email"])
      .join("cursos as c", "a.curso", "c.id")
      .where("a.matricula", "=", matricula)
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
    return await connection("alunos").insert({
      matricula,
      nome,
      curso,
      email,
      password,
    });
  },
};
