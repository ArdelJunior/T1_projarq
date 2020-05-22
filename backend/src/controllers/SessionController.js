const connection = require('../database/connection');


module.exports = {
  async login(request, response) {
      
      const { matricula } = request.body;

      if (!matricula) {
        return response
          .status(404)
          .json({ error: 'Não foram enviados os dados.' });
      }
            
      const aluno = await connection ('alunos')
        .where('matricula', matricula)
        .select('nome')
        .first();
            

        if (!aluno){
            return response.status(400).json({ error: 'Nenhum aluno encontrado com essa matricula'});
        }
        return response.json(aluno);
    
  },
};