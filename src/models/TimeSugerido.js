const connection = require("../database/connection");
const knexnest = require("knexnest");

module.exports = {
  async list() {
    const sql = connection("times_sugeridos as ts")
      .select([
        "ts.id as _id",
        "cp.id as _criador_id",
        "cp.matricula as _criador_matricula",
        "cp.nome as _criador_nome",
        "cp.email as _criador_email",
        "cpc.nome as _criador_curso",
        "a.id as _alunos__id",
        "a.matricula as _alunos__matricula",
        "a.nome as _alunos__nome",
        "a.email as _alunos__email",
        "ac.nome as _alunos__curso",
      ])
      .join("alunos as cp", "cp.id", "ts.criado_por")
      .join("cursos as cpc", "cp.curso", "cpc.id")
      .join("alunos_times_sugeridos as as", "as.id_time_sugerido", "ts.id")
      .join("alunos as a", "as.id_aluno", "a.id")
      .join("cursos as ac", "a.curso", "ac.id")
      .orderBy("ts.id");

    return await knexnest(sql ,[]);
  },

  async get(id) {
    const sql = connection("times_sugeridos as ts")
      .select([
        "ts.id as id",
        "cp.id as criador_id",
        "cp.matricula as criador_matricula",
        "cp.nome as criador_nome",
        "cp.email as criador_email",
        "cpc.nome as criador_curso",
        "a.id as alunos__id",
        "a.matricula as alunos__matricula",
        "a.nome as alunos__nome",
        "a.email as alunos__email",
        "ac.nome as alunos__curso",
      ])
      .join("alunos as cp", "cp.id", "ts.criado_por")
      .join("cursos as cpc", "cp.curso", "cpc.id")
      .join("alunos_times_sugeridos as as", "as.id_time_sugerido", "ts.id")
      .join("alunos as a", "as.id_aluno", "a.id")
      .join("cursos as ac", "a.curso", "ac.id")
      .where("ts.id", "=", id);

    return await knexnest(sql,[]);
  },

  async getByCriador(id) {
    const sql = connection("times_sugeridos as ts")
      .select([
        "ts.id as id",
        "cp.id as criador_id",
        "cp.matricula as criador_matricula",
        "cp.nome as criador_nome",
        "cp.email as criador_email",
        "cpc.nome as criador_curso",
        "a.id as alunos__id",
        "a.matricula as alunos__matricula",
        "a.nome as alunos__nome",
        "a.email as alunos__email",
        "ac.nome as alunos__curso",
      ])
      .leftJoin("alunos as cp", "cp.id", "ts.criado_por")
      .leftJoin("cursos as cpc", "cp.curso", "cpc.id")
      .leftJoin("alunos_times_sugeridos as as", "as.id_time_sugerido", "ts.id")
      .leftJoin("alunos as a", "as.id_aluno", "a.id")
      .leftJoin("cursos as ac", "a.curso", "ac.id")
      .where("ts.criado_por", "=", id);

    return await knexnest(sql);
  },

  async new(criado_por, alunos) {
    await connection("times_sugeridos").insert({ criado_por });
    if (alunos && alunos.length) {
      const time = await connection("times_sugeridos")
        .where("criado_por", "=", criado_por)
        .select("id")
        .first();
      const id = time.id;
      if (!id) {
        throw new Error("Falha na criação do time sugerido");
      }
      await connection("alunos_times_sugeridos").insert(
        alunos.map((e) => {
          return {
            id_time_sugerido: id,
            id_aluno: e.id,
          };
        })
      );
    }

    return true;
  },

  async update(id, alunos) {
    await connection("alunos_times_sugeridos")
      .where("id_time_sugerido", "=", id)
      .delete();

    return await connection("alunos_times_sugeridos").insert(
      alunos.map((e) => {
        return {
          id_time_sugerido: id,
          id_aluno: e.id,
        };
      })
    );
  },

  async delete(id) {
    await connection("alunos_times_sugeridos")
      .where("id_time_sugerido", "=", id)
      .delete();
    return await connection("times_sugeridos").where("id", "=", id).delete();
  },

  async deleteByCriador(id) {
    const time = await connection("times_sugeridos")
      .where("criado_por", "=", id)
      .select("id")
      .first();
    if (time === undefined) {
      throw new Error("Time não encontrado");
    }
    return await this.delete(time.id);
  },

  // async addAluno(id, aluno) {
  //   return await connection("alunos_times_sugeridos").insert({
  //     id_time_sugerido: id,
  //     id_aluno: aluno.id,
  //   });
  // },

  // async deleteAluno(id, aluno) {
  //   return await connection("alunos_times_sugeridos")
  //     .where("id_time_sugerido", "=", id)
  //     .andWhere("id_aluno", "=", aluno.id)
  //     .delete();
  // },
};
