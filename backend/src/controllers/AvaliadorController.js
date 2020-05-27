const Avaliador = require("../models/Avaliador");
const { hashPassword } = require("../helper/encryptPassword");

module.exports = {
  async index(request, response) {
    try {
      const avaliadores = await Avaliador.list();
      return response.json(avaliadores);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  },

  async create(request, response) {
    const { nome, email, password } = request.body;

    if (!nome) {
      return response.status(400).json({ error: "Nome não inserido" });
    }
    if (!email) {
      return response.status(400).json({ error: "E-mail não inserido" });
    }
    if (!password) {
      return response.status(400).json({ error: "Senha não inserida" });
    }

    try {
      const hashedPass = hashPassword(password);
      await Avaliador.new(nome, email, hashedPass);
      return response.status(201).json({ success: true });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  },
};
