const connection = require("../database/connection");
const Pessoa = require("./Pessoa");

module.exports = class Avaliador extends Pessoa {
  constructor() {
    super();
    this.table = "avaliadores";
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
