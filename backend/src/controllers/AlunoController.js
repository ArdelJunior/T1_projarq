const Aluno = require("../models/Aluno");
const AlunoFactory = require("../factories/AlunoFactory");
const { hashPassword } = require("../helper/encryptPassword");

module.exports = {
  async index(request, response) {
    try {
      const ac = new Aluno();
      const alunos = await ac.list();
      return response.json(alunos);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  },

  async listUnassigned(request, response) {
    try {
      const ac = new Aluno();
      const alunos = await ac.listUnassigned();
      return response.json(alunos);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  },

  async listAvailable(request, response) {
    const { id } = request.params;
    try {
      const ac = new Aluno();
      const alunos = await ac.listAvailable(id);
      return response.json(alunos);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  },

  async get(request, response) {
      const ac = new Aluno();
      const aluno = await ac.get(request.params.id);

    return response.json(aluno);
  },

  async create(request, response) {
    const { matricula, nome, curso, email, password } = request.body;
    const hashedPass = hashPassword(password);

    try {
      const ac = new AlunoFactory();
      await ac.create(matricula, nome, curso, email, hashedPass);
      return response.status(201).json({ success: true });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  },

  async delete(request, response) {
    const { id } = request.params;

    try {
      const ac = new Aluno();
      await ac.delete(id);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

    return response.status(204).send();
  },
};
