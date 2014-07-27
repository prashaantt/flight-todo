define(function (require) {
  var defineComponent = require('flight/lib/component');
  return defineComponent(taskInput);

  function taskInput() {
    this.attributes({
      taskInputSelector: '.js-task-input',
      submitButtonSelector: '.js-submit-btn',
    })

    this.handleItemSubmitted = function (event, data) {
      event.preventDefault();
      this.select('taskInputSelector').prop('disabled', true);
      this.select('submitButtonSelector').prop('disabled', true);
      this.trigger('uiItemSubmitted', {
        task: {
          id: Date.now(),
          desc: this.select('taskInputSelector').val()
        }
      });
    }

    this.handleItemAdded = function (event, data) {
      this.select('taskInputSelector').prop('disabled', false).val('');
      this.select('submitButtonSelector').prop('disabled', false);
    }

    this.after('initialize', function () {
      this.on('submit', this.handleItemSubmitted);
      this.on(document, 'dataItemAdded', this.handleItemAdded);
      this.trigger('uiNeedsTasks');
    })
  }
});
