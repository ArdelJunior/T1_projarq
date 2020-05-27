const connection = require("../database/connection");

module.exports = {
  async list() {
    return await connection("table").select(["id", "nome"]);
  },

  async get(id) {
    return await connection("table")
      .where("id", "=", id)
      .select(["id", "nome"])
      .first();
  },

  async new(...params) {
    return await connection("table").insert({ ...params });
  },

  async update(obj) {
    return await connection("table").where("id", "=", id).update(obj);
  },

  async delete(id) {
    return await connection("table").where("id", "=", id).delete();
  },
};
