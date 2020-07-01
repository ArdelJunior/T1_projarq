const { v4: uuid } = require("uuid");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const avaliadores = [
  {
    nome: "Sofia Castro Barros",
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    nome: "Breno Silva Barros",
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    nome: "Anna Pinto Araujo",
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    nome: "Beatriz Dias Oliveira",
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    nome: "Enzo Santos Martins",
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
];

exports.seed = function (knex) {
  return knex("avaliadores").insert(avaliadores);
};
