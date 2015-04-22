/**
 * @file 
 * @author 
 */

var vocApp = angular.module('vocEverywhere', ['ui.router',"firebase", 'ngTouch']);

  /** @private */
vocApp.constant('APP_SETUP', {
  itemsPP : 20,
  app_version : '0.4',
  langHash : {
    "EN" : "English",
    "NL" : "Dutch",
    "RU" : "Russian"
  },
  setup : {
   'newLanguage':"NL",
   'nativeOne'  :"EN",
   'nativeTwo'  :"RU"
  }
})




/**
 * 
 * @constructor
 */


vocApp.run(function($rootScope, APP_SETUP) {

  $rootScope.userAutorised = false;
  $rootScope.app_version = APP_SETUP.app_version;

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});

vocApp.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=1; i<total; i++) //beaware !!!! 1 instead of 0 !!!
      input.push(i);
    return input;
  };
});