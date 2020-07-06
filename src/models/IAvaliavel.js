
module.exports = class IAvaliavel {
  constructor() {
    if(!this.getNota) {
      throw new Error("getNota não implementado");
    }
  }
};
