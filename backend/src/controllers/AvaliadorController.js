const Avaliador = require('../models/Avaliador');
const { hashPassword } = require("../helper/encryptPassword");
 
module.exports = {
 
    async index (request, response) {
        const professores = await Avaliador.list();
    
        return response.json(professores);
    }, 
 
    async create (request, response) {

        const {nome, email, password} = request.body;
        
        const hashedPass = hashPassword(password);

        try {
            await Avaliador.new(nome, email, hashedPass);
            return response.status(201).json({ success: true });
          } catch (error) {
            console.error(error);
            return response.status(400).json({ error: error.message });
          }
    }
};
