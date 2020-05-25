exports.up = function(knex) {
  return knex.schema.createTable('avaliadores', function(table){
      table.increments('id').primary();
      table.string('email').notNullable();
      table.string('nome').notNullable();
      table.string('password').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('avaliadores');
};

