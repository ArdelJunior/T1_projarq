
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('criterios').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('criterios').insert([
        {id: 1, nome: 'Funcionamento'},
        {id: 2, nome: 'Processo'},
        {id: 3, nome: 'Pitch'},
        {id: 4, nome: 'Inovação'},
        {id: 5, nome: 'Formação do time'},
      ]);
    });
};
