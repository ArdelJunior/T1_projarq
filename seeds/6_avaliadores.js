const { v4: uuid } = require("uuid");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

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
  {
    nome: "Avaliador de testes",
    email: "avaliador@test.com",
    password: bcrypt.hashSync("12345678", 8),
  },
];

exports.seed = function (knex) {
  return knex("avaliadores").insert(avaliadores);
};
