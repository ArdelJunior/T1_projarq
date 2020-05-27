exports.up = function (knex) {
  return knex.schema.dropTableIfExists("alunos").then(function () {
    return knex.schema.dropTableIfExists("grupos_sugeridos").then(function () {
      return knex.schema.dropTableIfExists("grupos_finais").then(function () {
        return knex.schema.dropTableIfExists("avaliacoes").then(function () {
          return knex.schema.dropTableIfExists("cursos").then(function () {
            return knex.schema.dropTableIfExists("avaliadores");
          });
        });
      });
    });
  });
};

exports.down = function (knex) {};
