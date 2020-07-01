const Aluno = require("../models/Aluno");
const AlunoFactory = require("../factories/AlunoFactory");
const { hashPassword } = require("../helper/encryptPassword");

module.exports = {
  async index(request, response) {
    try {
      const alunos = await Aluno.list();
      return response.json(alunos);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  },

  async listUnassigned(request, response) {
    try {
      const alunos = await Aluno.listUnassigned();
      return response.json(alunos);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  },

  async get(request, response) {
    const aluno = await Aluno.get(request.params.id);

    return response.json(aluno);
  },

  async create(request, response) {
    const { matricula, nome, curso, email, password } = request.body;
    const hashedPass = hashPassword(password);

    try {
      await AlunoFactory.create(matricula, nome, curso, email, hashedPass);
      return response.status(201).json({ success: true });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  },
};
