exports.up = function(knex) {
  return knex.schema.createTable('cursos', function(table){

      table.string('id').primary();
      table.string('nome').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cursos');
};
