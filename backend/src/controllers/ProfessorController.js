const connection = require('../database/connection'); 
const crypto= require ('crypto'); 
 
module.exports = {
 
    async index (request, response) {
        const professores = await connection ('professores').select('*');
    
        return response.json(professores);
    }, 
 
    async create (request, response) {
    
        const {cpf, nome} = request.body; 

        const id = crypto.randomBytes(4).toString('HEX');
            
        await connection ('professores').insert({ 
            cpf,
            id,
            nome,
        })
        return response.status(201).json('Professor cadastrado');
    }
};
