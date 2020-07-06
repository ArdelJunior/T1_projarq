const cursos = [
  { id: 1, nome: "Engenharia de Software" },
  { id: 2, nome: "Ciência da Computação" },
  { id: 3, nome: "Sistemas de Informação" },
  { id: 4, nome: "Engenharia de Computação" },
];

exports.seed = function (knex) {
  return knex("cursos").insert(cursos);
};
