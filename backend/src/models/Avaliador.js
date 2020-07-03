const Pessoa = require("./Pessoa");

module.exports = class Avaliador extends Pessoa {
  constructor() {
    super("avaliador");
  }
}

// const connection = require("../database/connection");

// module.exports = {
//   async list() {
//     return await connection("avaliadores").select(["id", "nome", "email"]);
//   },

//   async get(id) {
//     return await connection("avaliadores")
//       .where("id", "=", id)
//       .select(["id", "nome", "email"])
//       .first();
//   },

//   async getPassword(id) {
//     return await connection("avaliadores")
//       .select("password")
//       .where("id", "=", id)
//       .first();
//   },

//   async new(nome, email, password) {
//     return await connection("avaliadores").insert({
//       nome,
//       email,
//       password,
//     });
//   },
// };
