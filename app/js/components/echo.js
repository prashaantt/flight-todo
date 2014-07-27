define(function (require) {
  var defineComponent = require('flight/lib/component');
  return defineComponent(echo);
  function echo() {
    this.handleInputChanged = function (event, data) {
      this.$node.text(data.text);
    }
    this.after('initialize', function () {
      this.on(document, 'uiInputChanged', this.handleInputChanged);
    })
  }
});
