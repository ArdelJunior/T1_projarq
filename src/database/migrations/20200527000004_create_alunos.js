exports.up = function (knex) {
  return knex.schema.createTable("alunos", function (table) {
    table.increments();
    table.integer("matricula").unique();
    table.string("nome").notNullable();
    table.integer("curso").notNullable().references("id").inTable("cursos");
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("alunos");
};
