const Administrador = require("../models/Administrador");
const { hashPassword } = require("../helper/encryptPassword");

module.exports = {
  async index(request, response) {
    try {
      const adm = new Administrador();
      const administradores = await adm.list();
      return response.json(administradores);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  },

  async create(request, response) {
    const { nome, email, password } = request.body;

    if (!nome) {
      return response.status(400).json({ error: "Nome não especificado" });
    }
    if (!email) {
      return response.status(400).json({ error: "E-mail não especificado" });
    }
    if (!password) {
      return response.status(400).json({ error: "Senha não inserida" });
    }

    try {
      const adm = new Administrador();
      const hashedPass = hashPassword(password);
      await adm.new(nome, email, hashedPass);
      return response.status(201).json({ success: true });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  },
};
