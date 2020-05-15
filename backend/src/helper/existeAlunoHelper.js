const connection = require('../database/connection');

module.exports = {
    async existeAluno(idAlunos = []) {
        let ehAluno = false;

        for (x = 0; x <= 3; x++) {

            if (idAlunos[x] !== "") {
                const idAlunoBanco = await connection('alunos').where('id', idAlunos[x]).select('id').first();
                
                if (idAlunoBanco === undefined) {
                    ehAluno = false;
                    x = 10;
                } else {
                    if (idAlunoBanco.id === idAlunos[x]) {
                        ehAluno = true;
                    }
                }
            }
        }
        
        return ehAluno;
    }
};
