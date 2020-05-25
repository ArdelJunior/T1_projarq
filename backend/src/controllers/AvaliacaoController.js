const connection = require('../database/connection'); 

module.exports = {

    async index (request, response){
        const professor_id = request.headers.authorization; 

        const avaliacoes = await connection ('avaliacoes')
            .where('professor_id', professor_id)
            .select('*');

        return response.json(avaliacoes);
    },
  
    async create (request, response) {
    
        const {nomeGrupo, nota1, nota2, nota3, nota4, nota5} = request.body; 

        const professor_id = request.headers.authorization;

        const professor = await connection('professores')
            .where('id', professor_id)
            .select('id')
            .first();

        if (!professor) {
            return response.status(401).json({ error: 'Operação não permitida.' });
        }

            
        await connection ('avaliacoes').insert({ 
            nota1,
            nota2,
            nota3,
            nota4,
            nota5,
            professor_id,
            nomeGrupo
        })
        return response.status(201).json('Avaliação cadastrada');
    }
};