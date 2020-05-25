const connection = require("../database/connection");
const Avaliacao = require("../models/Avaliacao");
const Avaliador = require("../models/Avaliador");

module.exports = {
  async index(request, response) {
    const avaliador = request.headers.authorization;

    const avaliacoes = await Avaliacao.list(avaliador);

    return response.json(avaliacoes);
  },

  async create(request, response) {
    const { nome_grupo, nota1, nota2, nota3, nota4, nota5 } = request.body;

    const avaliador = request.headers.authorization;

    const avaliadorExists = await Avaliador.get(avaliador);

    if (!avaliadorExists) {
      return response.status(401).json({ error: "Operação não permitida." });
    }

    await Avaliacao.new(avaliador, nome_grupo, nota1, nota2, nota3, nota4, nota5);
    return response.status(201).json({success: true});
  },
};
