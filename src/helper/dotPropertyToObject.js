/**
 * Converte propriedades em objetos. O ponto é utilizado como delimitador.
 * Se o valor da propriedade for um Array, este método será executado recursivamente.
 *
 * Exemplo:
 * ```
 * {
 *  "pessoa.nome": "Pedro",
 *  "pessoa.idade": 30,
 *  "pessoa.vestuario": [
 *    {
 *      "calcado.tipo": "Tenis",
 *      "calcado.marca": "Nike",
 *      "calcado.numero": 40
 *    }
 *  ]
 * }
 * ```
 * Após a conversão, ficará desta forma:
 * ```
 * {
 *  pessoa: {
 *    nome: "Pedro",
 *    idade: 30,
 *    vestuario: [
 *      {
 *        calcado: {
 *          tipo: "Tenis",
 *          marca: "Nike",
 *          numero: 40,
 *        }
 *      }
 *    ]
 *  }
 * }
 * ```
 * @param {*} obj - Objeto
 * @returns Objeto com as propriedades convertidas
 */
const dotPropertyToObject = (obj) => {
  Object.keys(obj).forEach((k) => {
    if (k.indexOf(".") > -1) {
      const [o, v] = k.split(".", 2);
      if (!obj[o]) {
        obj[o] = {};
      }
      obj[o][v] = obj[k];
      if (Array.isArray(obj[o][v])) {
        obj[o][v] = obj[k].map((item) => dotPropertyToObject(item));
      }
      delete obj[k];
    }
  });
  return obj;
};

module.exports = dotPropertyToObject;
