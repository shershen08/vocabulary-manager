




vocApp.controller('vocLoginCtrl', ['$scope', '$rootScope', '$state', '$firebaseAuth', 'userData',
                            function($scope, $rootScope, $state, $firebaseAuth, userData){
     
      //use $getAuth()

      //$scope.authObj.$getAuth()
      
      $scope.logMeIn = function(){

        //validate here

        $rootScope.userAutorised = true;
        $state.go('add');           
      }
         
}])


            
