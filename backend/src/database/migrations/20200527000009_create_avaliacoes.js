
exports.up = function(knex) {
  return knex.schema.createTable("avaliacoes", function(table) {
    table.increments();
    table.integer("nota");
    table.integer("id_time").notNullable().references("id").inTable("times");
    table.integer("id_criterio").notNullable().references("id").inTable("criterios");
    table.integer("id_avaliador").notNullable().references("id").inTable("avaliadores");
    table.unique(["id_time", "id_avaliador", "id_criterio"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("avaliacoes");
};
