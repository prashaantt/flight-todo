define(function (require) {
  var defineComponent = require('flight/lib/component');
  var Hogan = require('hogan');

  return defineComponent(taskList);

  function taskList() {
    this.attributes({
      tasksListSelector: '.items',
      itemCheckSelector: '.js-item-check',
      itemDescSelector: '.js-item-desc',
      closeBtnSelector: '.close',
      dataCompleted: 'data-completed',
      taskItemTemplate: "<li class='js-item clearfix' data-id={{id}} {{#status}}data-completed=true{{/status}} data-desc='{{desc}}'>" +
                          "<input type='checkbox' class='js-item-check' {{#status}}checked{{/status}}> {{desc}}" +
                          "<button type='button' class='close'>&times;</button>" +
                        "</li>"
    });

    this.handleItemAdded = function (event, data) {
      this.select('tasksListSelector').append(this.template.render(data.task));
    }

    this.handleDataTasks = function (event, data) {
      var $this = this;
      $.each(data.tasks, function (key, task) {
        var taskItem = $this.template.render(task);
        append = $this.select('tasksListSelector').append(taskItem);
      });
    }

    this.handleCheckboxToggleRegistered = function (event, data) {
      var taskItemNode = this.select('tasksListSelector').find('[data-id=' + data.id + ']');
      if (data.status) {
        taskItemNode.attr(this.attr.dataCompleted, true);
      } else {
        taskItemNode.removeAttr(this.attr.dataCompleted);
      }
    }

    this.handleItemDeleted = function (event, data) {
      var taskItemNode = this.select('tasksListSelector').find('[data-id=' + data.id + ']');
      taskItemNode.remove();
    }

    this.after('initialize', function () {
      this.template = Hogan.compile(this.attr.taskItemTemplate);
      this.on(document, 'dataItemAdded', this.handleItemAdded);
      this.on('change', {
        itemCheckSelector: 'uiItemCheckboxToggled'
      });
      this.on('click', {
        closeBtnSelector: 'uiItemNeedsDeleting'
      })
      this.on(document, 'dataCheckboxToggleRegistered', this.handleCheckboxToggleRegistered);
      this.on(document, 'dataItemDeleted', this.handleItemDeleted);
      this.on(document, 'dataTasks', this.handleDataTasks);
    });
  }
});
