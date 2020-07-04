const connection = require("../database/connection");
const IPessoa = require("./IPessoa");

module.exports = class Administrador extends IPessoa {
  constructor() {
    super();
    this.table = "administradores";
  }

  async list() {
    return await connection(this.table).select(["id", "nome", "email"]);
  }

  async get(id) {
    return await connection(this.table)
      .where("id", "=", id)
      .select(["id", "nome", "email"])
      .first();
  }

  async getPassword(id) {
    return await connection(this.table)
      .select("password")
      .where("id", "=", id)
      .first();
  }

  async new(nome, email, password) {
    return await connection(this.table).insert({
      nome,
      email,
      password,
    });
  }

  async update() {}
};
