const Criterio = require("../models/Criterio");

module.exports = {
  async index(request, response) {
    const Criterios = await Criterio.list();
    return response.json(Criterios);
  }
}