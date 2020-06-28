const TimeSugerido = require("../models/TimeSugerido");
const TimeSugeridoFactory = require("../factories/TimeSugeridoFactory");
const { getByCriador, deleteByCriador } = require("../models/Time");

module.exports = {
  async index(request, response) {
    try {
      const times = await TimeSugerido.list();
      return response.json(times);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async get(request, response) {
    const { id } = request.params;
    try {
      const time = await TimeSugerido.get(id);
      return response.json(time);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async getByCriador(request, response) {
    const { id } = request.params;
    try {
      const time = await TimeSugerido.getByCriador(id);
      return response.json(time);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async create(request, response) {
    const { criado_por, alunos } = request.body;

    try {
      await TimeSugeridoFactory.create(criado_por, alunos);
      return response.status(201).json({ success: true });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      await TimeSugerido.delete(id);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

    return response.status(204).send();
  },

  async deleteByCriador(request, response) {
    const { id } = request.params;

    try {
      await TimeSugerido.deleteByCriador(id);
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { alunos } = request.body;

    try {
      await TimeSugerido.update(id, alunos);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

    return response.status(201).json({ success: true });
  },
};
