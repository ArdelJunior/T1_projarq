const connection = require("../database/connection");

module.exports = {
  async list() {
    return await connection("criterios").select(["id", "nome"]);
  },

  async get(id) {
    return await connection("criterios")
      .where("id", "=", id)
      .select(["id", "nome"])
      .first();
  },

  async new(nome) {
    return await connection("criterios").insert({ nome });
  },

  async update(criterio) {
    return await connection("criterios").where("id", "=", id).update(criterio);
  },

  async delete(id) {
    return await connection("criterios").where("id", "=", id).delete();
  },
};
