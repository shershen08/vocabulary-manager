/**
 * @file 
 * @constructor
 */

var vocApp = angular.module('vocEverywhere', ['ui.router',"firebase", 'ngTouch']);

  /** @private */
vocApp.constant('APP_SETUP', {
  itemsPP : 20,
  app_version : '0.60',
  langHash : {
    "EN" : "English",
    "NL" : "Dutch",
    "RU" : "Russian"
  },
  setup : {
   'newLanguage':"NL",
   'nativeOne'  :"EN",
   'nativeTwo'  :"RU"
  },
  YAPI: {
    key: "PUT_YAPI_KEY_HERE"
  },
  FIREBASE : {
    appid : "PUT_FIREBASE_APP_URL_HERE"
  }
})



vocApp.run(function($rootScope, 
                    APP_SETUP,
                    $state,
                    $firebaseAuth,
                    userData) {

 // $rootScope.userAutorised = $waitForAuth()
  $rootScope.app_version = APP_SETUP.app_version;


  var ref = userData.authRef();
  var authObj = $firebaseAuth(ref);


  var authData = authObj.$getAuth();

  if (!authData) {
    
    $state.go('app.login');
    $rootScope.userAutorised = false;

  } else {

    $rootScope.userAutorised = true;
    console.log("Logged in as:", authData.uid);
    $state.go('app.home');
    
  }

  

  


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

    $rootScope.$on('$stateChangeSuccess', function(){
        $('.navbar-collapse').removeClass('in');
    });


    $rootScope.cats = [{
                          'title' : 'Verbs',
                          'id'    : 2,
                          'show'  : true
                        },
                        {
                          'title' : 'Nature',
                          'id'    : 3,
                          'show'  : true
                        },
                        {
                          'title' : 'Basic',
                          'id'    : 5,
                          'show'  : true  
                        },
                        {
                          'title' : 'Objects',
                          'id'    : 6,
                          'show'  : true  
                        },
                        {
                          'title' : 'Phrases',
                          'id'    : 4,
                          'show'  : true  
                        },
                        {
                          'title' : 'Reading',
                          'id'    : 1,
                          'show'  : true  
                        }];


});