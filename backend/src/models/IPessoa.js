
module.exports = class IPessoa {
    constructor() {
      if(!this.list) {
        throw new Error("list não implementado");
      }

      if(!this.get) {
        throw new Error("get não implementado");
      }

      if(!this.getPassword) {
        throw new Error("getPassword não implementado");
      }

      if(!this.new) {
        throw new Error("new não implementado");
      }

      if(!this.update) {
        throw new Error("update não implementado");
      }
    }
};
