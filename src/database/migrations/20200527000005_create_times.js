
exports.up = function(knex) {
    return knex.schema.createTable("times", function(table) {
      table.increments();
      table.string("nome").unique();
      table.integer("criado_por").references("id").inTable("administradores");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("times");
};
