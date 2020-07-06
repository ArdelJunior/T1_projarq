const connection = require("../database/connection");
const dotPropertyToObject = require("../helper/dotPropertyToObject");
const IAvaliavel = require("./IAvaliavel");
const Time = require("./Time");

module.exports = class Avaliacao extends IAvaliavel {
  constructor() {
    super();
  }

  getNota(obj) {
    if (!obj || !obj.avaliacao) {
      return 0;
    }

    return obj.avaliacao.reduce((acc, av) => acc + av.nota, 0);
  }

  async sqlFirst(filter = {}) {
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
    rs.forEach((item) => dotPropertyToObject(item));
    return rs;
  }

  async getAvaliacao(time, avaliador) {
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

    rs.forEach((item) => dotPropertyToObject(item));
    return rs;
  }

  async getAvaliacoes(filter = {}) {
    const sql = await this.sqlFirst(filter);
    const sqlFinal = await Promise.all(
      sql.map(async (item) => {
        const { avaliador, time } = item;
        item.avaliacao = await this.getAvaliacao(time.id, avaliador.id);
        item.nota = this.getNota(item);
        return item;
      })
    );
    return sqlFinal;
  }

  async list() {
    return await this.getAvaliacoes();
  }

  async get(idTime, idAvaliador) {
    return await this.getAvaliacoes({ time: idTime, avaliador: idAvaliador });
  }

  async getByTime(id) {
    return await this.getAvaliacoes({ time: id });
  }

  async getByAvaliador(id) {
    return await this.getAvaliacoes({ avaliador: id });
  }

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
  }

  async update(avaliacao) {
    return await connection("avaliacoes")
      .where("id", "=", avaliacao.id)
      // .where("id_avaliador", "=", avaliador)
      // .andWhere("id_time", "=", time)
      .update(avaliacao);
  }

  async delete(id) {
    return await connection("avaliacoes").where("id_time", "=", id).delete();
  }
};
