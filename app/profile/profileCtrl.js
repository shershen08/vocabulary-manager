
/**
 * Controller for a profile page
 * @constructor
 */
vocApp.controller('vocProfileCtrl',
    ['$scope', '$rootScope', '$state', '$stateParams', '$firebaseAuth', 'userData', 'APP_SETUP',
    function($scope,
          $rootScope,
          $state,
          $stateParams,
          $firebaseAuth,
          userData,
          APP_SETUP){


    if(!$rootScope.userAutorised) $state.go('register');

    $scope.userData = $rootScope.userData;
    userData.getUser($stateParams.useritemID);

    $scope.langs = APP_SETUP.langHash;


    /** This is a description of the foo function. */
    $scope.logout = function(){
      $state.go('logout');
    }     
         
}])