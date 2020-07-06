exports.up = function (knex) {
  return knex.schema.createTable("alunos_times", function (table) {
    table.increments();
    table
      .integer("id_aluno")
      .unique()
      .references("id")
      .inTable("alunos")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("id_time")
      .references("id")
      .inTable("times")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("alunos_times");
};
