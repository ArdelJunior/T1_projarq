const connection = require("../database/connection");

module.exports = {
  async list() {
    return await connection("avaliadores").select(["id", "nome", "email"]);
  },
  async get(id) {
    return await connection("avaliadores")
      .where("id", "=", id)
      .select(["id", "nome", "email"])
      .first();
  },
  async getPassword(id) {
    return await connection("avaliadores")
      .select("password")
      .where("id", "=", id)
      .first();
  },
  async new(nome, email, password) {
    if (!nome) {
      throw new Error("Nome não inserido");
    }
    if (!email) {
      throw new Error("E-mail não inserido");
    }
    if (!password) {
      throw new Error("Senha não inserida");
    }

    return await connection("avaliadores").insert({
      nome,
      email,
      password,
    });
  },
};
