exports.up = function(knex) {
                        
    return knex.schema.createTable('avaliacoes', function(table){

        table.integer('nota1').notNullable();
        table.integer('nota2').notNullable();
        table.integer('nota3').notNullable();
        table.integer('nota4').notNullable();
        table.integer('nota5').notNullable();
        
        table.string('id_avaliador').notNullable();
        table.foreign('id_avaliador').references('id').inTable('avaliadores');

        table.string('nome_grupo').notNullable();
        table.foreign('nome_grupo').references('nome_grupo').inTable('grupos_finais');
      
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('avaliacoes');
};
