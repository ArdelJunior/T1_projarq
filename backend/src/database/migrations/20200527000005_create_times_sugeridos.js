
exports.up = function(knex) {
  return knex.schema.createTable("times_sugeridos", function(table) {
    table.increments();
    table.integer("criado_por").unique().notNullable().references("id").inTable("alunos");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("times_sugeridos");
};
