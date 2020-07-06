function truncate(knex, tables) {
  return Promise.each(tables, function(table) {
    return knex.raw(`TRUNCATE TABLE ${table} CASCADE;`);
  });
}

const tables = [
  "alunos_times_sugeridos",
  "alunos_times",
  "times",
  "alunos",
  "avaliadores",
  "cursos",
  "criterios",
  "administradores"
]

exports.seed = function (knex) {
  return truncate(knex, tables);
};
