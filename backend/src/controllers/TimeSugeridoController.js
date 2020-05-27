const connection = require("../database/connection");
const Aluno = require("../models/Aluno");
const TimeSugerido = require("../models/TimeSugerido");
const { validateTimeSugerido, getPayload } = require("../helper/AlunoHelper");

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

  async getByAluno(request, response) {
    const { id } = request.params;
    try {
      const time = await TimeSugerido.getByAluno(id);
      return response.json(time);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async create(request, response) {
    const { criado_por, alunos } = request.body;

    try {
      await TimeSugerido.new(criado_por, alunos);
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

  async deleteByAluno(request, response) {
    const { id } = request.params;

    try {
      await TimeSugerido.deleteByAluno(id);
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
