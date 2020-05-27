const connection = require("../database/connection");
const Aluno = require("../models/Aluno");
const Time = require("../models/Time");

module.exports = {
  async index(request, response) {
    try {
      const times = await Time.list();
      return response.json(times);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
  
  async get(request, response) {
    const { id } = request.params;
    try {
      const time = await Time.get(id);
      return response.json(time);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async getByAvaliador(request, response) {
    const { id } = request.params;
    try {
      const time = await Time.getByAvaliador(id);
      return response.json(time);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async create(request, response) {
    const { criado_por, nome, alunos } = request.body;

    try {
      await Time.new(criado_por, nome, alunos);
      return response.status(201).json({ success: true });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      await Time.delete(id);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

    return response.status(204).send();
  },

  async deleteByAvaliador(request, response) {
    const { id } = request.params;

    try {
      await Time.deleteByAvaliador(id);
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { alunos } = request.body;

    try {
      await Time.update(id, alunos);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

    return response.status(201).json({ success: true });
  },
};
