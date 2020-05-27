
exports.up = function(knex) {
  return knex.schema.createTable("criterios", function(table) {
    table.increments();
    table.string("nome").unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("criterios");
};
