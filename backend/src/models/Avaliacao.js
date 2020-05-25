const connection = require("../database/connection");

module.exports = {
  async list(avaliador) {
    return avaliador === undefined
      ? await connection("avaliacoes").select("*")
      : await connection("avaliacoes")
          .where("id_avaliador", "==", avaliador)
          .select("*");
  },

  async new(avaliador, nome_grupo, nota1, nota2, nota3, nota4, nota5) {
    return await connection("avaliacoes").insert({
      nota1,
      nota2,
      nota3,
      nota4,
      nota5,
      avaliador,
      nome_grupo,
    });
  },
};
