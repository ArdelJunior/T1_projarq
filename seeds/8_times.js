const times = [
  {
    nome: "Time 1",
    criado_por: 1,
  },
  {
    nome: "Time 2",
    criado_por: 1,
  },
  {
    nome: "Time 3",
    criado_por: 1,
  },
  {
    nome: "Time 4",
    criado_por: 1,
  },
  {
    nome: "Time 5",
    criado_por: 1,
  },
  {
    nome: "Time 6",
    criado_por: 1,
  },
];

const alunosTimes = [
  {
    id_aluno: 7,
    id_time: 5,
  },
  {
    id_aluno: 16,
    id_time: 5,
  },
  {
    id_aluno: 25,
    id_time: 5,
  },
  {
    id_aluno: 30,
    id_time: 5,
  },
  {
    id_aluno: 32,
    id_time: 5,
  },
  {
    id_aluno: 6,
    id_time: 4,
  },
  {
    id_aluno: 11,
    id_time: 4,
  },
  {
    id_aluno: 12,
    id_time: 4,
  },
  {
    id_aluno: 14,
    id_time: 4,
  },
  {
    id_aluno: 34,
    id_time: 4,
  },
  {
    id_aluno: 13,
    id_time: 6,
  },
  {
    id_aluno: 26,
    id_time: 6,
  },
  {
    id_aluno: 31,
    id_time: 6,
  },
  {
    id_aluno: 39,
    id_time: 6,
  },
  {
    id_aluno: 40,
    id_time: 6,
  },
  {
    id_aluno: 8,
    id_time: 1,
  },
  {
    id_aluno: 9,
    id_time: 1,
  },
  {
    id_aluno: 18,
    id_time: 1,
  },
  {
    id_aluno: 20,
    id_time: 1,
  },
  {
    id_aluno: 21,
    id_time: 1,
  },
  {
    id_aluno: 1,
    id_time: 2,
  },
  {
    id_aluno: 2,
    id_time: 2,
  },
  {
    id_aluno: 15,
    id_time: 2,
  },
  {
    id_aluno: 19,
    id_time: 2,
  },
  {
    id_aluno: 33,
    id_time: 2,
  },
  {
    id_aluno: 3,
    id_time: 3,
  },
  {
    id_aluno: 4,
    id_time: 3,
  },
  {
    id_aluno: 5,
    id_time: 3,
  },
  {
    id_aluno: 17,
    id_time: 3,
  },
  {
    id_aluno: 29,
    id_time: 3,
  },
];

exports.seed = function (knex) {
  return knex("times").insert(times)
  .then(function () {
    return knex("alunos_times").insert(alunosTimes);
  });
};