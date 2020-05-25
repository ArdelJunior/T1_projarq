const { v4: uuid } = require("uuid");
const { getPayload } = require("../src/helper/AlunoHelper");

const alunos = [
  { id: uuid(), matricula: 171451696, nome: "Davi Dias", curso: 3 },
  { id: uuid(), matricula: 188406938, nome: "André Barbosa", curso: 4 },
  { id: uuid(), matricula: 147564127, nome: "Laura Fernandes", curso: 4 },
  { id: uuid(), matricula: 166105502, nome: "Vitór Pereira", curso: 4 },
  { id: uuid(), matricula: 168799334, nome: "Larissa Souza", curso: 1 },
  { id: uuid(), matricula: 163079596, nome: "Livia Santos", curso: 2 },
  { id: uuid(), matricula: 155426877, nome: "Beatriz Carvalho", curso: 1 },
  { id: uuid(), matricula: 137357326, nome: "Sarah Souza", curso: 4 },
  { id: uuid(), matricula: 206080215, nome: "Samuel Fernandes", curso: 3 },
  { id: uuid(), matricula: 176954714, nome: "Tomás Alves", curso: 3 },
  { id: uuid(), matricula: 172032337, nome: "Otávio Cunha", curso: 2 },
  { id: uuid(), matricula: 202543470, nome: "Giovana Pinto", curso: 3 },
  { id: uuid(), matricula: 132229406, nome: "Kaua Silva", curso: 3 },
  { id: uuid(), matricula: 192563836, nome: "Felipe Rocha", curso: 1 },
  { id: uuid(), matricula: 180856425, nome: "Luan Cunha", curso: 3 },
  { id: uuid(), matricula: 181555483, nome: "Brenda Silva", curso: 1 },
  { id: uuid(), matricula: 174235295, nome: "André Castro", curso: 1 },
  { id: uuid(), matricula: 119508290, nome: "Aline Araujo", curso: 3 },
  { id: uuid(), matricula: 207841049, nome: "Camila Cavalcanti", curso: 3 },
  { id: uuid(), matricula: 183484544, nome: "Lara Ribeiro", curso: 2 },
  { id: uuid(), matricula: 159393206, nome: "Bianca Cavalcanti", curso: 3 },
  { id: uuid(), matricula: 182607942, nome: "Bianca Gomes", curso: 4 },
  { id: uuid(), matricula: 139663893, nome: "Kaua Pereira", curso: 1 },
  { id: uuid(), matricula: 203583685, nome: "Guilherme Araujo", curso: 2 },
  { id: uuid(), matricula: 188696362, nome: "Otávio Pereira", curso: 3 },
  { id: uuid(), matricula: 122795450, nome: "Gustavo Costa", curso: 2 },
  { id: uuid(), matricula: 113951658, nome: "Arthur Melo", curso: 3 },
  { id: uuid(), matricula: 151685796, nome: "Samuel Fernandes", curso: 2 },
  { id: uuid(), matricula: 115332248, nome: "Victor Araujo", curso: 1 },
  { id: uuid(), matricula: 177320708, nome: "Miguel Castro", curso: 2 },
  { id: uuid(), matricula: 161877356, nome: "Guilherme Costa", curso: 3 },
  { id: uuid(), matricula: 184318110, nome: "Raissa Araujo", curso: 3 },
  { id: uuid(), matricula: 165639606, nome: "Sophia Cardoso", curso: 3 },
  { id: uuid(), matricula: 139648345, nome: "Mariana Gomes", curso: 4 },
  { id: uuid(), matricula: 143358902, nome: "Ágatha Souza", curso: 4 },
  { id: uuid(), matricula: 180743523, nome: "Eduardo Rocha", curso: 1 },
  { id: uuid(), matricula: 170375996, nome: "Aline Cunha", curso: 1 },
  { id: uuid(), matricula: 146991369, nome: "Douglas Pinto", curso: 2 },
  { id: uuid(), matricula: 195596658, nome: "Vitor Carvalho", curso: 1 },
  { id: uuid(), matricula: 170628603, nome: "Letícia Azevedo", curso: 3 },
];

const timesSugeridos = alunos.map((aluno) => {
  return {
    ...getPayload(
      aluno.id,
      [...alunos]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.ceil(Math.random() * 2) + 2)
    ),
  };
});

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("gruposProvisorios")
    .del()
    .then(function () {
      return knex("alunos")
        .del()
        .then(function () {
          // Inserts seed entries
          return knex("alunos")
            .insert(alunos)
            .then(function () {
              return knex("gruposProvisorios").insert(timesSugeridos);
            });
        });
    });
};
