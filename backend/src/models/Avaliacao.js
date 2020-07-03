const connection = require("../database/connection");
const knexnest = require("knexnest");
const nhjs = require("nesthydrationjs")();

const dotToObj = (obj) => {
  Object.keys(obj).forEach((k) => {
    if (k.indexOf(".") > -1) {
      const [o, v] = k.split(".", 2);
      if (!obj[o]) {
        obj[o] = {};
      }
      obj[o][v] = obj[k];
      delete obj[k];
    }

    if (Array.isArray(obj[k])) {
      obj[k] = obj[k].map((item) => dotToObj(item));
    }
  });
  return obj;
};

const sqlFirst = async (filter = {}) => {
  const { time, avaliador } = filter;

  let firstFilter = true;
  let sql = connection("avaliacoes as a")
    .select([
      "t.id as time.id",
      "t.nome as time.nome",
      "av.id as avaliador.id",
      "av.nome as avaliador.nome",
      "av.email as avaliador.email",
    ])
    .distinct()
    .join("times as t", "a.id_time", "t.id")
    .join("avaliadores as av", "a.id_avaliador", "av.id");

  if (time) {
    sql = firstFilter
      ? sql.where("t.id", "=", time)
      : sql.andWhere("t.id", "=", time);
    firstFilter = false;
  }

  if (avaliador) {
    sql = firstFilter
      ? sql.where("av.id", "=", avaliador)
      : sql.andWhere("av.id", "=", avaliador);
    firstFilter = false;
  }

  let rs = await sql;
  rs.forEach((item) => dotToObj(item));
  return rs;
};

const getAvaliacao = async (time, avaliador) => {
  let rs = await connection("avaliacoes as a")
    .select([
      "a.id",
      "a.nota",
      "c.id as criterio.id",
      "c.nome as criterio.nome",
    ])
    .join("criterios as c", "a.id_criterio", "c.id")
    .where("a.id_time", "=", time)
    .andWhere("a.id_avaliador", "=", avaliador);

  rs.forEach((item) => dotToObj(item));
  return rs;
};

const getAvaliacoes = async (filter = {}) => {
  const sql = await sqlFirst(filter);
  const sqlFinal = await Promise.all(
    sql.map(async (item) => {
      const { avaliador, time } = item;
      item.avaliacao = await getAvaliacao(time.id, avaliador.id);
      return item;
    })
  );
  return sqlFinal;
};

module.exports = {
  async list() {
    return await getAvaliacoes();
  },

  async getByTime(id) {
    return await getAvaliacoes({ time: id });
  },

  async getByAvaliador(id) {
    return await getAvaliacoes({ avaliador: id });
  },

  async new(id_avaliador, id_time, avaliacao) {
    const payload = avaliacao.map((av) => {
      return {
        id_avaliador,
        id_time,
        id_criterio: av.criterio.id,
        nota: av.nota,
      };
    });

    return await connection("avaliacoes").insert(payload);
  },

  async update(avaliacao) {
    return await connection("avaliacoes")
      .where("id", "=", avaliacao.id)
      // .where("id_avaliador", "=", avaliador)
      // .andWhere("id_time", "=", time)
      .update(avaliacao);
  },

  async delete(id) {
    return await connection("avaliacoes").where("id", "=", id).delete();
  },
};
