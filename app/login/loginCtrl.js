
/**
 * @file 
 * @constructor
 * 
 */

vocApp.controller('vocLoginCtrl', ['$scope',
                                    '$rootScope',
                                    '$state',
                                    '$firebaseAuth',
                                    'userData',
      function($scope,
                $rootScope,
                $state,
                $firebaseAuth,
                userData){
     
      //use $getAuth()

      //$scope.authObj.$getAuth()
      
      $scope.logMeIn = function(){
        $rootScope.userAutorised = true;
        $state.go('app.add');           
      }
         
}])


            
