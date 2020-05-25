const { v4: uuid} = require('uuid');
const connection = require('../database/connection'); 
 
module.exports = {
 
    async index (request, response) {
        const professores = await connection ('professores').select('*');
    
        return response.json(professores);
    }, 
 
    async create (request, response) {
    
        const {cpf, nome} = request.body; 

        const id = uuid();
            
        await connection ('professores').insert({ 
            cpf,
            id,
            nome,
        })
        return response.status(201).json('Professor cadastrado');
    }
};
