const Avaliacao = require("../models/Avaliacao");
const AvaliacaoFactory = require("../factories/AvaliacaoFactory");
const { update } = require("../database/connection");

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

  async get(request, response) {
    const { id } = request.params;

    try {
      const avaliacoes = await Avaliacao.get(id);
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
    const { avaliador, time, avaliacao } = request.body;

    try {
      await AvaliacaoFactory.create(avaliador, time, avaliacao);
      return response.json({ success: true });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async update(request, response) {
    const { avaliacao } = request.body;
    try {
      await Promise.all(avaliacao.map(async (av) => {
        const { id, nota } = av;
        await Avaliacao.update({ id, nota });
      }));
      return response.json({ success: true });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      await Avaliacao.delete(id);
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
};
