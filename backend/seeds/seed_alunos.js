
const { v4: uuid} = require('uuid');

const createId = function() {
  return crypto.randomBytes(4).toString('HEX');
}


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('alunos').del()
    .then(function () {
      // Inserts seed entries
      return knex('alunos').insert([
        {
          matricula: 171451696,
          nome: "Davi Dias",
          curso: 3,
          id: uuid(),
        },
        {
          matricula: 188406938,
          nome: "André Barbosa",
          curso: 4,
          id: uuid()
        },
        {
          matricula: 147564127,
          nome: "Laura Fernandes",
          curso: 4,
          id: uuid()
        },
        {
          matricula: 166105502,
          nome: "Vitór Pereira",
          curso: 4,
          id: uuid(),
        },
        {
          matricula: 168799334,
          nome: "Larissa Souza",
          curso: 1,
          id: uuid(),
        },
        {
          matricula: 163079596,
          nome: "Livia Santos",
          curso: 2,
          id: uuid(),
        },
        {
          matricula: 155426877,
          nome: "Beatriz Carvalho",
          curso: 1,
          id: uuid(),
        },
        {
          matricula: 137357326,
          nome: "Sarah Souza",
          curso: 4,
          id: uuid(),
        },
        {
          matricula: 206080215,
          nome: "Samuel Fernandes",
          curso: 3,
          id: uuid(),
        },
        {
          matricula: 176954714,
          nome: "Tomás Alves",
          curso: 3,
          id: uuid(),
        }
      ]);
    });
};
