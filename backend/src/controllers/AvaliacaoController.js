const Avaliacao = require("../models/Avaliacao");
const AvaliacaoFactory = require("../factories/AvaliacaoFactory");

module.exports = {
  async index(request, response) {
    // const avaliador = request.headers.authorization;

    try {
      const avaliacoes = await Avaliacao.list();
      return response.json(avaliacoes);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
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

  async getByAvaliador(request, response) {
    const { id } = request.params;

    try {
      const avaliacoes = await Avaliacao.getByAvaliador(id);
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
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      await Avaliacao.delete(id);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

    return response.status(204).send();
  }
};
