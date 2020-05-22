exports.up = function(knex) {
    return knex.schema.createTable('professores', function(table){

        table.integer ('cpf', 11).primary();
        table.string ('id').notNullable();
        table.string('nome').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('professores');
};

