const Avaliacao = require("../models/Avaliacao");
const AvaliacaoFactory = require("../factories/AvaliacaoFactory");

module.exports = {
  async index(request, response) {
    // const avaliador = request.headers.authorization;

    const avaliacoes = await Avaliacao.list();

    return response.json(avaliacoes);
  },

  async getByTime(request, response) {
    const { id } = request.params;

    try {
      const avaliacoes = await Avaliacao.getByTime(id);
      return response.json(avaliacoes);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async create(request, response) {
    // const { id_avaliador, id_time, id_criterio, nota } = request.body;
    const { id_avaliador, id_time, avaliacoes } = request.body;

    try {
      await AvaliacaoFactory.create(id_avaliador, id_time, avaliacoes);
      return response.json({ success: true });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
    // const { nome_grupo, nota1, nota2, nota3, nota4, nota5 } = request.body;

    // const avaliador = request.headers.authorization;

    // const avaliadorExists = await Avaliador.get(avaliador);

    // if (!avaliadorExists) {
    //   return response.status(401).json({ error: "Operação não permitida." });
    // }

    // await Avaliacao.new(avaliador, nome_grupo, nota1, nota2, nota3, nota4, nota5);
    // return response.status(201).json({success: true});
  },
};
