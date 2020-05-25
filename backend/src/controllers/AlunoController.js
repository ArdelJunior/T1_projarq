const { v4: uuid} = require('uuid');
const connection = require('../database/connection'); 
 
module.exports = {
 
    async index (request, response) {
        const alunos = await connection('alunos as a')
            .select(['a.id', 'a.matricula', 'a.nome', 'c.nome as curso'])
            .join('cursos as c', 'a.curso', 'c.id');
    
        return response.json(alunos);
    }, 
 
    async create (request, response) {
    
        const {matricula, nome, curso} = request.body;

        if(!matricula) {
            return response.status(400).json({error: "Matrícula não inserida"});
        }
        if(!nome) {
            return response.status(400).json({error: "Nome não inserido"});
        }
        if(!curso) {
            return response.status(400).json({error: "Curso não inserido"});
        }

        const id = uuid();

        const cursos = await connection('cursos')
            .select('id').where('nome', '=', curso);

        let idCurso;
        
        try {
            idCurso = cursos[0]['id'];
            if(idCurso === undefined) {
                throw new Error('');
            }
        }
        catch(e) {
            return response.status(400).json({error: `Curso ${curso} não encontrado`});
        }
            
        try {
            await connection ('alunos').insert({
                id,
                matricula,
                nome,
                curso: idCurso,
            })
            return response.status(201).json({id});
        } catch(e) {
            console.error(e);
            // if(/constraint/i.test(e.code)) {
            //     return response.status(400).json({error: `O aluno ${matricula} já existe`});
            // }
            return response.status(400).json({e});
        }
    }
};
