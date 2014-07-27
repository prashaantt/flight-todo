define(function (require) {
  return withStorage;

  function withStorage() {
    this.write = function (key, value) {
      localStorage[key] = JSON.stringify(value);
    }

    this.read = function (key) {
      value = localStorage[key];
      if (value != undefined) {
        return JSON.parse(value);
      } else {
        return value;
      }
    }
  }
});
