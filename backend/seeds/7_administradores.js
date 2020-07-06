const crypto = require("crypto");
const bcrypt = require("bcrypt");

const administradores = [
  {
    nome: "God",
    email: "admin@test.com",
    password: bcrypt.hashSync("12345678", 8),
  },
];

exports.seed = function (knex) {
  return knex("administradores").insert(administradores);
};
