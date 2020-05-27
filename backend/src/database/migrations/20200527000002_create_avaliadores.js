exports.up = function (knex) {
  return knex.schema.createTable("avaliadores", function (table) {
    table.increments();
    table.string("nome").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("avaliadores");
};
