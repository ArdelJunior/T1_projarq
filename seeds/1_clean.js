exports.seed = function (knex) {
  return knex("alunos_times_sugeridos")
    .truncate()
    .then(function () {
      return knex("times_sugeridos").truncate();
    })
    .then(function () {
      return knex("alunos_times").truncate();
    })
    .then(function () {
      return knex("times").truncate();
    })
    .then(function () {
      return knex("alunos").truncate();
    })
    .then(function () {
      return knex("avaliadores").truncate();
    })
    .then(function () {
      return knex("cursos").truncate();
    })
    .then(function () {
      return knex("criterios").truncate();
    })
    .then(function() {
      return knex("administradores").truncate();
    });
};
