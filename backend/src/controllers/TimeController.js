const Time = require("../models/Time");
const TimeFactory = require("../factories/TimeFactory");

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

  async getByCriador(request, response) {
    const { id } = request.params;
    try {
      const time = await Time.getByCriador(id);
      return response.json(time);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async create(request, response) {
    const { criador, nome, alunos } = request.body;

    const checkCursos = [...new Set(alunos.map((a) => a.curso))];
    if (checkCursos.length < 2) {
      return response
        .status(400)
        .json({
          error:
            "Devem ser adicionados alunos de pelo menos 2 cursos diferentes.",
        });
    }

    try {
      await TimeFactory.create(criador, nome, alunos);
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

  async deleteByCriador(request, response) {
    const { id } = request.params;

    try {
      await Time.deleteByCriador(id);
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },

  async update(request, response) {
    const { id } = request.params;
    const { time } = request.body;

    const checkCursos = [...new Set(time.alunos.map((a) => a.curso))];
    if (checkCursos.length < 2) {
      return response
        .status(400)
        .json({
          error:
            "Devem ser adicionados alunos de pelo menos 2 cursos diferentes.",
        });
    }

    try {
      await Time.update(id, time);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

    return response.status(201).json({ success: true });
  },
};
