const connection = require('../database/connection');

module.exports = {
    
    async verificaCurso(idAlunos = []) {

        let cursoDiferente = false;
        let cursoAlunoX;
        let cursoAlunoY;

        for (let x = 0, y = 0; x <= 3; x++, y = x + 1){
            while (y <= 4){

                if (idAlunos[x] !== "") {
                    if (idAlunos[y] !== "") {
                        cursoAlunoX = await connection('alunos').where('id', idAlunos[x]).select('curso').first();
                        cursoAlunoY = await connection('alunos').where('id', idAlunos[y]).select('curso').first();
                        if(cursoAlunoX != cursoAlunoY){
                            cursoDiferente = true;
                            x = 10;
                            y = 10;
                        }
                    }
                }

                y++;
            }

        }

        return cursoDiferente;

    }
};
