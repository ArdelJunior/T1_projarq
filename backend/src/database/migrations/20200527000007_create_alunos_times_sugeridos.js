
exports.up = function(knex) {
  return knex.schema.createTable("alunos_times_sugeridos", function(table) {
    table.increments();
    table.integer("id_aluno").notNullable().references("id").inTable("alunos");
    table.integer("id_time_sugerido").notNullable().references("id").inTable("times_sugeridos");
  });
};

exports.down = function(knex) {
  knex.schema.dropTable("alunos_times_sugeridos");
};
