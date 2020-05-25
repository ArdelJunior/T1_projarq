const connection = require("../database/connection");

module.exports = {
  async list() {
    return await connection("cursos").select(["id", "nome"]);
  },
  async get(nome) {
    return await connection("cursos").select(["id", "nome"]).where("nome", "=", nome).first();
  },
};
