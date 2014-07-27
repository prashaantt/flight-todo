define(function (require) {
  var defineComponent = require('flight/lib/component');
  var withStorage = require('mixins/with_storage');

  return defineComponent(taskData, withStorage);

  function taskData() {
    this.attributes({
      taskItemSelector: '.js-item',
      taskDescSelector: '.js-item-desc',
      disabledColor: '#ccc',
      taskKey: 'tasks',
      defaultTaskStatus: '',
      completedTaskStatus: 'completed'
    });

    this.handleItemSubmitted = function (event, data) {
      data.task.status = this.defaultTaskStatus;
      this.tasks[data.task.id] = data.task;
      this.write(this.attr.taskKey, this.tasks);
      this.trigger('dataItemAdded', data);
    }

    this.handleItemCheckboxToggled = function (event, data) {
      var taskItemNode = $(data.el).closest(this.select('taskItemSelector'));
      var status;
      if (data.el.checked) {
        status = this.attr.completedTaskStatus;
      } else {
        status = this.attr.defaultTaskStatus;
      }
      this.tasks[taskItemNode.data('id')].status = status;
      this.write(this.attr.taskKey, this.tasks);
      this.trigger('dataCheckboxToggleRegistered', {
        id: taskItemNode.data('id'),
        status: status
      });
    }

    this.handleItemsNeedsDeleting = function (event, data) {
      var taskItemNode = $(data.el).closest(this.select('taskItemSelector'));
      delete this.tasks[taskItemNode.data('id')];
      this.write(this.attr.taskKey, this.tasks);
      this.trigger('dataItemDeleted', {
        id: taskItemNode.data('id')
      })
    }

    this.handleNeedsTasks = function (event, data) {
      if (this.tasks) {
        var tasks = [];
        $.each(this.tasks, function (key, task) {
          tasks.push(task);
        });
        this.trigger('dataTasks', {tasks: tasks});
      }
    }

    this.after('initialize', function () {
      this.tasks = this.read(this.attr.taskKey) || {};
      this.on('uiItemSubmitted', this.handleItemSubmitted);
      this.on('uiItemCheckboxToggled', this.handleItemCheckboxToggled);
      this.on('uiItemNeedsDeleting', this.handleItemsNeedsDeleting);
      this.on('uiNeedsTasks', this.handleNeedsTasks);
    })
  }
});
