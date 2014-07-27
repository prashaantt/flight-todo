define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var TaskInput = require('components/task_input');
  var TaskList = require('components/task_list');
  var TaskData = require('components/task_data');

  /**
   * Module exports
   */

  return initialize;

  /**
   * Module function
   */

  function initialize() {
    TaskData.attachTo(document);
    TaskList.attachTo('.js-list');
    TaskInput.attachTo('.input');
  }

});
