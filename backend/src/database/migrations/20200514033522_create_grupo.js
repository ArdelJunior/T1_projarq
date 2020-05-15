exports.up = function(knex) {
    return knex.schema.createTable('grupos', function(table){

        table.increments();

        table.string ('nomeGrupo').unique();
        
        table.string('idAluno1').notNullable();
        table.foreign('idAluno1').references('id').inTable('alunos');
        
        table.string('idAluno2').notNullable();
        table.foreign('idAluno2').references('id').inTable('alunos');

        table.string('idAluno3');
        table.foreign('idAluno3').references('id').inTable('alunos');
        
        table.string('idAluno4');
        table.foreign('idAluno4').references('id').inTable('alunos');
        
        table.string('idAluno5');
        table.foreign('idAluno5').references('id').inTable('alunos');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('grupos');
};

