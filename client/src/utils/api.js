const apiRoot = "/api/";

export const login = apiRoot + "login";
export const logout = apiRoot + "logout";
export const signUp = apiRoot + "signup";

export const getCursos = apiRoot + "cursos";
export const getCriterios = apiRoot + "criterios";

export const getAlunos = apiRoot + "alunos";
export const getAlunosDisponiveis = apiRoot + "alunos/disponiveis/";
export const addAluno = apiRoot + "alunos";
export const deleteAluno = apiRoot + "alunos/";

export const getAvaliadores = apiRoot + "avaliadores";
export const addAvaliador = apiRoot + "avaliadores";
export const deleteAvaliador = apiRoot + "avaliadores/";

export const getTimeSugerido = apiRoot + "times_sugeridos/"
export const setTimeSugerido = apiRoot + "times_sugeridos";
export const getTimeSugeridoAluno = apiRoot + "times_sugeridos/aluno/"

export const getTimeFinal = apiRoot + "times/";
export const setTimeFinal = apiRoot + "times";
export const deleteTimeFinal = apiRoot + "times/";
export const getTimesNaoAvaliados = apiRoot + "times/disponiveis";

export const getAvaliacoes = apiRoot + "avaliacoes";
export const getAvaliacoesTime = apiRoot + "avaliacoes/time/";
export const getAvaliacoesAvaliador = apiRoot + "avaliacoes/avaliador/";
export const addAvaliacao = apiRoot + "avaliacoes";
export const editAvaliacao = apiRoot + "avaliacoes/";
export const deleteAvaliacao = apiRoot + "avaliacoes/";


// export const getTime = apiRoot + "grupo/";
