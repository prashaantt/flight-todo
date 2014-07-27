define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(addTask);

  /**
   * Module function
   */

  function addTask() {
    this.defaultAttrs({

    });

    this.after('initialize', function () {

    });
  }

});
