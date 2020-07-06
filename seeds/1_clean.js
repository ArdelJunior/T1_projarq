const Promise = require("bluebird");

function truncateRaw(knex, tables) {
  return Promise.each(tables, function (table) {
    return knex.raw(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`);
  });
}

function truncate(knex, tables) {
  return Promise.each(tables, function (table) {
    return knex(table).truncate();
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
  "administradores",
];

exports.seed = function (knex) {
  return truncateRaw(knex, tables).catch(() => truncate(knex, tables));
};
