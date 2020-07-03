// const connection = require("../database/connection");

module.exports = class Pessoa {
    constructor() {
      if(!this.list) {
        throw new Error("list não implementado");
      }

      if(!this.get) {
        throw new Error("get não implementado");
      }

      if(!this.getPassword) {
        throw new Error("getPassword não implementado");
      }

      if(!this.new) {
        throw new Error("new não implementado");
      }

      if(!this.update) {
        throw new Error("update não implementado");
      }
    }

    // async list() {
    //   return await connection(this.table).select(["id", "nome", "email"]);
    // };

    // async get(id) {
    //   return await connection(this.table)
    //     .where("id", "=", id)
    //     .select(["id", "nome", "email"])
    //     .first();
    // }

    // async getPassword(id) {
    //   return await connection(this.table)
    //     .select("password")
    //     .where("id", "=", id)
    //     .first();
    // }

    // async new(nome, email, password) {
    //   return await connection(this.table).insert({
    //     nome,
    //     email,
    //     password,
    //   });
    // }
};
