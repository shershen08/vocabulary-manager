/**
 * @file 
 * @author 
 */

vocApp.config(function($stateProvider, $urlRouterProvider) {

    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');


     $stateProvider
        .state("home", {
          url: "/home/page:{pageNo}/sortby:{sortingOrder}",
          controller : 'vocListCtrl',
          templateUrl: 'app/list/template.html'
        })
        .state("add", {
          url: "/add",
          controller : 'vocAddCtrl',
          templateUrl: 'app/add/template.html'
        })
        
        .state("edit", {
          url: "/edit/{itemID}",
          controller : 'vocOneEditCtrl',
          templateUrl: 'app/edit/template.html'
        })
        .state("item", {
          url: "/item/{itemID}",
          controller : 'vocOneCtrl',
          templateUrl: 'app/edit/item.html'
        })
        .state("profile", {
          url: "/profile/{userID}",
          controller : 'vocProfileCtrl',
          templateUrl: 'app/profile/profile.html'
        })
        .state("login", {
          url: "/login",
          controller : 'vocLoginCtrl',
          templateUrl: 'app/login/login.html'
        })
        .state("categories", {
          url: "/categories",
          controller : 'vocCatCtrl',
          templateUrl: 'app/categories/template.html'
        })
          .state("logout", {
          url: "/logout",
          controller : function($rootScope, $scope, $state){

              $rootScope.userAutorised = false;
              $state.go('register');

          }
        })
            .state("register", {
          url: "/register",
          controller : 'vocRegisterCtrl',
          templateUrl: 'app/profile/register.html'
        })
});