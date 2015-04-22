
/**
 * 
 * @constructor
 */

vocApp.controller('vocRegisterCtrl', ['$scope', '$rootScope', '$state', '$firebaseAuth', 'userData',
                            function($scope, $rootScope, $state, $firebaseAuth, userData){

    var ref = userData.authRef();
    $scope.authObj = $firebaseAuth(ref);

    if($rootScope.userAutorised) $state.go('profile');



    $scope.startRegistration = function(){

        $scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
          console.log("Logged in as:", authData.uid);
           $rootScope.userAutorised = true;
           $rootScope.userData = authData;

           userData.addUser(authData);
          
           $state.go('profile', { userID: authData.uid});

        }).catch(function(error) {
          console.error("Authentication failed:", error);
        });

    }               
         
}])

