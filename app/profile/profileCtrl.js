
/**
 * @file 
 * @constructor
 * 
 */

vocApp.controller('vocProfileCtrl',
    ['$scope',
     '$rootScope',
     '$state',
     '$stateParams',
     '$firebaseAuth',
     'userData',
     'APP_SETUP',
    function($scope,
          $rootScope,
          $state,
          $stateParams,
          $firebaseAuth,
          userData,
          APP_SETUP){


  var ref = userData.authRef();
    $scope.authObj = $firebaseAuth(ref);


  var authData = $scope.authObj.$getAuth();

  if (!authData) {
    $state.go('app.login');
    $rootScope.userAutorised = false;
  }

  $rootScope.userAutorised = true;
  console.log("Logged in as:", authData.uid);

  $scope.userData = authData;
/*
  auth: Object
  expires: 1432541859
  google: Object
        accessToken: "ya29.fQEdgoLIVQRWqo0enIVWS4J42o-GBIvO8wIqqzdO-PYePtxUdeOYKF7L3tmFAyIRI0iPxGzxBFh_Pw"
        cachedUserProfile: Object
        family_name: "Kuznetsov"
        gender: "male"
        given_name: "Michail"
        id: "116495383850521859362"
        link: "https://plus.google.com/+MichailKuznetsovRU"
        locale: "en-GB"
        name: "Michail Kuznetsov"
        picture: "https://lh6.googleusercontent.com/-rzt6wkCkfGU/AAAAAAAAAAI/AAAAAAAATD4/whu5pNlpsfs/photo.jpg"
        __proto__: Object
        displayName: "Michail Kuznetsov"
        id: "116495383850521859362"
        __proto__: Object
  provider: "google"
  token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InVpZCI6Imdvb2dsZToxMTY0OTUzODM4NTA1MjE4NTkzNjIiLCJwcm92aWRlciI6Imdvb2dsZSJ9LCJpYXQiOjE0MzI0NTU0NTl9.4fgSXyxhrrXtBjIRk4FUPVL2tBvhSVSoq2KzTTnAdKA"
  uid: "google:116495383850521859362"
  __proto__: Object
*/


    
    //userData.getUser($stateParams.useritemID);

    $scope.langs = APP_SETUP.langHash;



    $scope.exportWords = function(){
        //todo
    }


     $scope.categories = $rootScope.cats;
         
}])