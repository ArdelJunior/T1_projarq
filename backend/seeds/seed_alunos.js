const { v4: uuid } = require("uuid");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { getPayload } = require("../src/helper/AlunoHelper");

const alunos = [
  {
    matricula: 171451696,
    nome: "Davi Dias",
    curso: 3,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 188406938,
    nome: "André Barbosa",
    curso: 4,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 147564127,
    nome: "Laura Fernandes",
    curso: 4,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 166105502,
    nome: "Vitór Pereira",
    curso: 4,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 168799334,
    nome: "Larissa Souza",
    curso: 1,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 163079596,
    nome: "Livia Santos",
    curso: 2,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 155426877,
    nome: "Beatriz Carvalho",
    curso: 1,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 137357326,
    nome: "Sarah Souza",
    curso: 4,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 206080215,
    nome: "Samuel Fernandes",
    curso: 3,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 176954714,
    nome: "Tomás Alves",
    curso: 3,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 172032337,
    nome: "Otávio Cunha",
    curso: 2,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 202543470,
    nome: "Giovana Pinto",
    curso: 3,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 132229406,
    nome: "Kaua Silva",
    curso: 3,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 192563836,
    nome: "Felipe Rocha",
    curso: 1,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 180856425,
    nome: "Luan Cunha",
    curso: 3,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 181555483,
    nome: "Brenda Silva",
    curso: 1,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 174235295,
    nome: "André Castro",
    curso: 1,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 119508290,
    nome: "Aline Araujo",
    curso: 3,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 207841049,
    nome: "Camila Cavalcanti",
    curso: 3,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 183484544,
    nome: "Lara Ribeiro",
    curso: 2,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 159393206,
    nome: "Bianca Cavalcanti",
    curso: 3,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 182607942,
    nome: "Bianca Gomes",
    curso: 4,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 139663893,
    nome: "Kaua Pereira",
    curso: 1,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 203583685,
    nome: "Guilherme Araujo",
    curso: 2,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 188696362,
    nome: "Otávio Pereira",
    curso: 3,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 122795450,
    nome: "Gustavo Costa",
    curso: 2,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 113951658,
    nome: "Arthur Melo",
    curso: 3,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 151685796,
    nome: "Samuel Fernandes",
    curso: 2,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 115332248,
    nome: "Victor Araujo",
    curso: 1,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 177320708,
    nome: "Miguel Castro",
    curso: 2,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 161877356,
    nome: "Guilherme Costa",
    curso: 3,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 184318110,
    nome: "Raissa Araujo",
    curso: 3,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 165639606,
    nome: "Sophia Cardoso",
    curso: 3,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 139648345,
    nome: "Mariana Gomes",
    curso: 4,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 143358902,
    nome: "Ágatha Souza",
    curso: 4,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 180743523,
    nome: "Eduardo Rocha",
    curso: 1,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 170375996,
    nome: "Aline Cunha",
    curso: 1,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 146991369,
    nome: "Douglas Pinto",
    curso: 2,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 195596658,
    nome: "Vitor Carvalho",
    curso: 1,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
  {
    matricula: 170628603,
    nome: "Letícia Azevedo",
    curso: 3,
    email: uuid().split("-")[0] + "@test.com",
    password: bcrypt.hashSync(crypto.randomBytes(16).toString("utf-8"), 8),
  },
];

// const timesSugeridos = alunos.map((aluno) => {
//   return {
//     ...getPayload(
//       aluno.id,
//       [...alunos]
//         .sort(() => 0.5 - Math.random())
//         .slice(0, Math.ceil(Math.random() * 2) + 2)
//     ),
//   };
// });

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("alunos")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("alunos").insert(alunos);
      // return knex("grupos_sugeridos")
      //   .del()
      //   .then(function () {
      //     return knex("alunos")
      //       .del()
      //       .then(function () {
      //         // Inserts seed entries
      //         return knex("alunos")
      //           .insert(alunos)
      //           // .then(function () {
      //           //   return knex("grupos_sugeridos").insert(timesSugeridos);
      //           // });
      // });
    });
};
