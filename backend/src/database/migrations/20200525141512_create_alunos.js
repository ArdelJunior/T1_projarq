exports.up = function(knex) {
  return knex.schema.createTable('alunos', function(table){
      table.integer('matricula').primary();
      table.string('id').unique().notNullable();
      table.string('nome').notNullable();
      table.integer('curso').notNullable();
      table.integer('email').unique().notNullable();
      table.integer('password').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('alunos');
};
