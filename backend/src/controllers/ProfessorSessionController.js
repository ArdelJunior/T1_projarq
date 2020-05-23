const connection = require('../database/connection');


module.exports = {
  async login(request, response) {
      
      const { cpf } = request.body;

      if (!cpf) {
        return response
          .status(404)
          .json({ error: 'Não foram enviados os dados.' });
      }
            
      const professor = await connection ('professores')
        .where('cpf', cpf)
        .select('nome')
        .first();
            

        if (!professor){
            return response.status(400).json({ error: 'Nenhum professor encontrado com essa matricula'});
        }
        return response.json(professor);
    
  },
};