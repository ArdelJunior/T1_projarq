exports.up = function(knex) {
    return knex.schema.createTable('alunos', function(table){

        table.integer ('matricula', 8).primary();
        table.string ('id').notNullable();
        table.string('nome').notNullable();
        table.integer('curso', 1).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('alunos');
};
