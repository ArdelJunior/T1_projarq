const Avaliacao = require("../models/Avaliacao");
const AvaliacaoFactory = require("../factories/AvaliacaoFactory");
const Time = require("../models/Time");

module.exports = {
  async index(request, response) {
    // const avaliador = request.headers.authorization;

    try {
      const ac = new Avaliacao();
      const avaliacoes = await ac.list();
      return response.json(avaliacoes);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async get(request, response) {
    const { id } = request.params;

    try {
      const ac = new Avaliacao();
      const avaliacoes = await ac.get(id);
      return response.json(avaliacoes);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async getByTime(request, response) {
    const { id } = request.params;

    try {
      const ac = new Avaliacao();
      const tc = new Time();

      const time = await tc.get(id);
      time.avaliacoes = await ac.getByTime(id);
      time.nota = tc.getNota();
      
      return response.json(time);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async getByAvaliador(request, response) {
    const { id } = request.params;

    try {
      const ac = new Avaliacao();
      const avaliacoes = await ac.getByAvaliador(id);
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
      await Promise.all(
        avaliacao.map(async (av) => {
          const { id, nota } = av;
          const ac = new Avaliacao();
          await ac.update({ id, nota });
        })
      );
      return response.json({ success: true });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      const ac = new Avaliacao();
      await ac.delete(id);
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
};
