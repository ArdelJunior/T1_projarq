const connection = require("../database/connection");
const knexnest = require("knexnest");

module.exports = {
  async list() {
    const times = await connection("avaliacoes as a")
      .select(["ts.id", "ts.nome"])
      .distinct()
      .join("times as ts", "ts.id", "a.id_time");

    const avaliacoes = await Promise.all(times.map(async(t) => {
      return {
        time: t,
        avaliacoes: await this.getByTime(t.id)
      }
    }));

    return avaliacoes;
  },

  async get(id) {
    const sql = connection("avaliacoes as a")
      .select([
        "ts.id as _time_id",
        "ts.nome as _time_nome",
        "av.id as _avaliador_id",
        "av.nome as _avaliador_nome",
        "av.email as _avaliador_email",
        "a.id as _avaliacoes__id",
        "c.nome as _avaliacoes__criterio",
        "a.nota as _avaliacoes__nota",
      ])
      .join("times as ts", "a.id_time", "ts.id")
      .join("criterios as c", "a.id_criterio", "c.id")
      .join("avaliadores as av", "a.id_avaliador", "av.id")
      .where("id", "=", id);

    return knexnest(sql);
  },

  async getByTime(id) {
    const avaliadores = await connection("avaliacoes")
      .where("id_time", "=", id)
      .select("id_avaliador")
      .distinct();
    console.log(avaliadores);
    const avaliacoes = await Promise.all(
      avaliadores.map(async (av) => {
        const sql = connection("avaliacoes as a")
          .select([
            "av.nome as _avaliador_nome",
            "av.email as _avaliador_email",
            "a.id as _avaliacao__id",
            "c.nome as _avaliacao__criterio",
            "a.nota as _avaliacao__nota",
          ])
          .join("times as ts", "a.id_time", "ts.id")
          .join("criterios as c", "a.id_criterio", "c.id")
          .join("avaliadores as av", "a.id_avaliador", "av.id")
          .where("a.id_time", "=", id)
          .andWhere("id_avaliador", "=", av.id_avaliador);

        const rs = await knexnest(sql);
        return rs ? rs[0] : null;
      })
    );

    return avaliacoes;
  },

  async new(id_avaliador, id_time, avaliacoes) {
    const payload = avaliacoes.map((av) => {
      return {
        id_avaliador,
        id_time,
        id_criterio: av.id_criterio,
        nota: av.nota,
      };
    });


    return await connection("avaliacoes").insert(payload);
  },

  async update(obj) {
    return await connection("avaliacoes").where("id", "=", id).update(obj);
  },

  async delete(id) {
    return await connection("avaliacoes").where("id", "=", id).delete();
  },
};
