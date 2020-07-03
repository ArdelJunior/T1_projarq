const connection = require("../database/connection");

module.exports = class Pessoa {
    constructor(tipo) {
      switch(tipo) {
        case "administrador":
          this.table = "administradores";
          break;
        case "avaliador":
          this.table = "avaliadores";
          break;
        default:
          throw new Exception("Tipo de pessoa desconhecido");
      }
    }

    async list() {
      return await connection(this.table).select(["id", "nome", "email"]);
    };

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
};
