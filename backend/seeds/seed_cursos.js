
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cursos').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cursos').insert([
        {id: 1, nome: 'Engenharia de Software'},
        {id: 2, nome: 'Ciência da Computação'},
        {id: 3, nome: 'Sistemas de Informação'},
        {id: 4, nome: 'Engenharia de Computação'},
      ]);
    });
};
