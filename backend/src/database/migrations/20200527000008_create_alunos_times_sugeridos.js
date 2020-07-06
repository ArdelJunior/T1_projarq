exports.up = function (knex) {
  return knex.schema.createTable("alunos_times_sugeridos", function (table) {
    table.increments();
    table
      .integer("id_aluno")
      .notNullable()
      .references("id")
      .inTable("alunos")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("id_time_sugerido")
      .notNullable()
      .references("id")
      .inTable("times_sugeridos")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("alunos_times_sugeridos");
};
