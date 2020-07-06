module.exports = class PessoaFactory {

  createPessoa();

  async create(nome, email, password) {
    if (!nome) {
      throw new Error("Nome não especificado");
    }
    if (!email) {
      throw new Error("E-mail não especificado");
    }
    if (!password) {
      throw new Error("Senha não inserida");
    }
    
    const pessoa = this.createPessoa();

    return await pessoa.new(nome, email, password);
  }
};
