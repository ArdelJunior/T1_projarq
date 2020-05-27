const seq = Array.from(Array(40).keys()).map((i) => i + 1);

const timesSugeridos = seq.map((i) => {
  return { criado_por: i };
});

const at = seq.map((i) =>
  [...seq]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.ceil(Math.random() * 4) + 2)
    .map((j) => {
      return { id_time: i, id_aluno: j };
    })
);

const alunosTimes = [].concat.apply([], at);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("times_sugeridos")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("times_sugeridos").insert(timesSugeridos);
    })
    .then(function () {
      return knex("alunos_times_sugeridos")
        .truncate()
        .then(function () {
          return knex("alunos_times_sugeridos").insert(alunosTimes);
        });
    });
};
