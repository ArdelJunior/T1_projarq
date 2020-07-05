const connection = require("../database/connection");
const knexnest = require("knexnest");
const IAvaliavel = require("./IAvaliavel");

module.exports = class Time extends IAvaliavel {
  constructor() {
    super();
    this.time = null;
  }

  getNota(obj) {
    if (!this.time || !this.time.avaliacoes) {
      throw new Error("Time não definido ainda");
    }

    return this.time.avaliacoes.reduce((acc, av) => acc + av.nota, 0);
  }

  async list() {
    const sql = connection("times as ts")
      .select([
        "ts.id as _id",
        "ts.nome as _nome",
        "cp.id as _criador_id",
        "cp.nome as _criador_nome",
        "cp.email as _criador_email",
        "a.id as _alunos__id",
        "a.matricula as _alunos__matricula",
        "a.nome as _alunos__nome",
        "a.email as _alunos__email",
        "ac.nome as _alunos__curso",
      ])
      .join("avaliadores as cp", "cp.id", "ts.criado_por")
      .leftJoin("alunos_times as as", "as.id_time", "ts.id")
      .leftJoin("alunos as a", "as.id_aluno", "a.id")
      .leftJoin("cursos as ac", "a.curso", "ac.id")
      .orderBy("ts.id");

    return await knexnest(sql, []);
  }

  async get(id) {
    const sql = connection("times as ts")
      .select([
        "ts.id as id",
        "ts.nome as nome",
        "cp.id as criador_id",
        "cp.nome as criador_nome",
        "cp.email as criador_email",
        "a.id as alunos__id",
        "a.matricula as alunos__matricula",
        "a.nome as alunos__nome",
        "a.email as alunos__email",
        "ac.nome as alunos__curso",
      ])
      .join("avaliadores as cp", "cp.id", "ts.criado_por")
      .leftJoin("alunos_times as as", "as.id_time", "ts.id")
      .leftJoin("alunos as a", "as.id_aluno", "a.id")
      .leftJoin("cursos as ac", "a.curso", "ac.id")
      .where("ts.id", "=", id);

    this.time = await knexnest(sql);
    return this.time;
  }

  async getByCriador(id) {
    const sql = connection("times as ts")
      .select([
        "ts.id as id",
        "ts.nome as nome",
        "cp.id as criador_id",
        "cp.nome as criador_nome",
        "cp.email as criador_email",
        "a.id as alunos__id",
        "a.matricula as alunos__matricula",
        "a.nome as alunos__nome",
        "a.email as alunos__email",
        "ac.nome as alunos__curso",
      ])
      .join("avaliadores as cp", "cp.id", "ts.criado_por")
      .leftJoin("alunos_times as as", "as.id_time", "ts.id")
      .leftJoin("alunos as a", "as.id_aluno", "a.id")
      .leftJoin("cursos as ac", "a.curso", "ac.id")
      .where("ts.criado_por", "=", id);

    this.time = await knexnest(sql);
    return this.time;
  }

  async getNaoAvaliados(id) {
    const subQuery = connection("times as ts")
      .select(["ts.id"])
      .distinct()
      .leftJoin("avaliacoes as a", "a.id_time", "ts.id")
      .leftJoin("avaliadores as av", "a.id_avaliador", "av.id")
      .where("av.id", "=", id);

    const sql = connection("times as ts")
      .select([
        "ts.id as id",
        "ts.nome as nome"
      ])
      .whereNotIn("ts.id", subQuery)
      .orderBy("ts.id");

    return await sql;
  }

  async new(criado_por, nome, alunos) {
    await connection("times").insert({ criado_por, nome });
    if (alunos && alunos.length) {
      const time = await connection("times")
        .where("nome", "=", nome)
        .select("id")
        .first();
      const id = time.id;
      if (!id) {
        throw new Error("Falha na criação do time");
      }
      await connection("alunos_times").insert(
        alunos.map((e) => {
          return {
            id_time: id,
            id_aluno: e.id,
          };
        })
      );
    }

    return true;
  }

  async update(id, time) {
    const { nome } = time;
    await connection("times").where("id", "=", id).update({ nome });

    await connection("alunos_times").where("id_time", "=", id).delete();

    return await connection("alunos_times").insert(
      time.alunos.map((e) => {
        return {
          id_time: id,
          id_aluno: e.id,
        };
      })
    );
  }

  async delete(id) {
    await connection("alunos_times").where("id_time", "=", id).delete();
    return await connection("times").where("id", "=", id).delete();
  }

  async deleteByCriador(id) {
    const time = await connection("times")
      .where("criado_por", "=", id)
      .select("id")
      .first();
    if (time === undefined) {
      throw new Error("Time não encontrado");
    }
    return await this.delete(time.id);
  }
};
