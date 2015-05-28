/**
 * @file 
 * @author 
 */

vocApp.config(function($stateProvider, $urlRouterProvider) {

    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

    //viewName@stateName

  $stateProvider.state('app', {
      abstract: true,
      views: {
         page: {
           template: '<h2>Welcome to vocApp!</h2>'
         },
         
         '': {
           template: ''
         },
         
         wrapper: {
           templateUrl: 'app/template/headermenu.html'
         }
       
      }
    }).state("app.home", {
       url: "/home/page:{pageNo}/sortby:{sortingOrder}",
       views: {
            'page@': {
                templateUrl: 'app/list/template.html',
                controller: 'vocListCtrl'
            }
          }
        })
        .state("app.add", {
          url: "/add",
          views : {
            "page@" : {
                  controller : 'vocAddCtrl',
                  templateUrl: 'app/add/template.html'
          }
        }
        
        })
        .state("app.quiz", {
          url: "/quiz",
          views : {
            "page@" : {
                  controller : 'vocQuizCtrl',
                  templateUrl: 'app/quiz/template.html'
            }
        }
        })
        
        .state("app.edit", {
          url: "/edit/{itemID}",
          views : {
            "page@" : {
                  controller : 'vocOneEditCtrl',
                  templateUrl: 'app/edit/template.html'
            }
        }
        })
        .state("app.item", {
          url: "/item/{itemID}",
          views : {
            "page@" : {
                  controller : 'vocOneCtrl',
                  templateUrl: 'app/edit/item.html'
            }
          }
        })
        .state("app.profile", {
          url: "/profile/{userID}",
          views : {
            "page@" : {
                controller : 'vocProfileCtrl',
                templateUrl: 'app/profile/profile.html'
          }
        }
        })
        .state("app.login", {
          url: "/login",
           views : {
            "page@" : {
                controller : 'vocLoginCtrl',
                templateUrl: 'app/login/login.html'
              }
          } 
        })
        .state("app.categories", {
          url: "/categories",
           views : {
            "page@" : {
              controller : 'vocCatCtrl',
              templateUrl: 'app/categories/template.html'
            }
          }
        })
          .state("app.logout", {
          url: "/logout",
          controller : function($rootScope, $scope, $state, $firebaseAuth){

            var MY_FIREBASE_URL = 'PUT_FIREBASE_APP_URL_HERE';

            var ref = new Firebase(MY_FIREBASE_URL);
            $scope.authObj = $firebaseAuth(ref);

              $rootScope.userAutorised = false;
              $rootScope.userData = '';
              
              $scope.authObj.$unauth();

              $state.go('app.register');

          }
        })
            .state("app.register", {
          url: "/register",
          views : {
            "page@" : {
          controller : 'vocRegisterCtrl',
          templateUrl: 'app/profile/register.html'
        }
      }
        })


});