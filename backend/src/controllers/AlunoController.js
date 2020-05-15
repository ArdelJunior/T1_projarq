const crypto= require ('crypto'); 
const connection = require('../database/connection'); 
 
module.exports = {
 
    async index (request, response) {
        const alunos = await connection ('alunos').select('*');
    
        return response.json(alunos);
    }, 
 
    async create (request, response) {
    
        const {matricula, nome, curso} = request.body; 

        const id = crypto.randomBytes(4).toString('HEX');
            
        await connection ('alunos').insert({ 
            matricula,
            id,
            nome,
            curso,
        })
        return response.status(201).json({id});
    }
};
