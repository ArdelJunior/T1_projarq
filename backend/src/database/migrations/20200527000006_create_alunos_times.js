
exports.up = function(knex) {
  return knex.schema.createTable("alunos_times", function(table) {
    table.increments();
    table.integer("id_aluno").unique().references("id").inTable("alunos");
    table.integer("id_time").references("id").inTable("times");
  });
};

exports.down = function(knex) {
  knex.schema.dropTable("alunos_times");
};
