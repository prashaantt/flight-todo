'use strict';

requirejs.config({
  baseUrl: 'bower_components',
  paths: {
    'components': '../js/components',
    'mixins': '../js/mixins',
    'page': '../js/page',
    'hogan': 'hogan/web/builds/3.0.2/hogan-3.0.2.min.amd'
  }
});

require(
  [
    'flight/lib/compose',
    'flight/lib/registry',
    'flight/lib/advice',
    'flight/lib/logger',
    'flight/lib/debug'
  ],

  function(compose, registry, advice, withLogging, debug) {
    debug.enable(true);
    compose.mixin(registry, [advice.withAdvice]);

    require(['page/default'], function(initializeDefault) {
      initializeDefault();
    });
  }
);
