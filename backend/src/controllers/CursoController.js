const Curso = require("../models/Curso");

module.exports = {
  async index(request, response) {
    const cursos = await Curso.list();
    return response.json(cursos);
  }
}