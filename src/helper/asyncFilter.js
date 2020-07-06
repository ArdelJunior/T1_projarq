module.exports = {
  async asyncFilter(arr, predicate) {
    return Promise.all(arr.map(predicate)).then((results) =>
      arr.filter((_v, index) => results[index])
    );
  },
};
