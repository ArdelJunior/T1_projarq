exports.up = function(knex) {
                        
    return knex.schema.createTable('avaliacoes', function(table){

        table.integer('nota1').notNullable();
        table.integer('nota2').notNullable();
        table.integer('nota3').notNullable();
        table.integer('nota4').notNullable();
        
        table.string('professor_id').notNullable();
        table.foreign('professor_id').references('id').inTable('professores');

        table.string('nomeGrupo').notNullable();
        table.foreign('nomeGrupo').references('nomeGrupo').inTable('gruposFinais');
      
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('avaliacoes');
};
