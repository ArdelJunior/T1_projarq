const Time = require("../models/Time");
const TimeFactory = require("../factories/TimeFactory");
const { checkCursos } = require("../helper/constraints");

module.exports = {
  async index(request, response) {
    try {
      const tc = new Time();
      const times = await tc.list();
      return response.json(times);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async get(request, response) {
    const { id } = request.params;
    try {
      const tc = new Time();
      const time = await tc.get(id);
      return response.json(time);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async getByCriador(request, response) {
    const { id } = request.params;
    try {
      const tc = new Time();
      const time = await tc.getByCriador(id);
      return response.json(time);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async getNaoAvaliados(request, response) {
    const { id } = request;
    try {
      const tc = new Time();
      const times = await tc.getNaoAvaliados(id);
      return response.json(times);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async create(request, response) {
    const { nome, alunos } = request.body;
    const { id: criador } = request;

    try {
      checkCursos(alunos);
      await TimeFactory.create(criador, nome, alunos);
      return response.status(201).json({ success: true });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      const tc = new Time();
      await tc.delete(id);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

    return response.status(204).send();
  },

  async deleteByCriador(request, response) {
    const { id } = request.params;

    try {
      const tc = new Time();
      await tc.deleteByCriador(id);
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { time } = request.body;

    try {
      checkCursos(time.alunos);
      const tc = new Time();
      await tc.update(id, time);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

    return response.status(201).json({ success: true });
  },
};
