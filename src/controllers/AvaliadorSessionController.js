const connection = require("../database/connection");

module.exports = {
  async login(request, response) {
    const { cpf } = request.body;

    if (!cpf) {
      return response
        .status(404)
        .json({ error: "Não foram enviados os dados." });
    }

    const avaliador = await connection("avaliadores")
      .where("cpf", cpf)
      .select("nome")
      .first();

    if (!avaliador) {
      return response
        .status(400)
        .json({ error: "Nenhum avaliador encontrado com essa matricula" });
    }
    return response.json(avaliador);
  },
};
