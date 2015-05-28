

/**
 * @file
 * @constructor
 */

vocApp.controller('vocOneEditCtrl', ['$scope',
                                      'wordsData',
                                      '$stateParams',
                                      '$state', 
                            function($scope,
                                    wordsData,
                                    $stateParams,
                                    $state){

    $scope.messageShow = false;                      
    /*
    loading initial data
    */
  
        wordsData.getList().then(function(list){

        $scope.word = list.$getRecord($stateParams.itemID);


         $scope.cancelEditing = function(){
            $state.go('app.home', {pageNo:1});
         }  


          $scope.deleteItem = function(){
            
            list.$remove($scope.word).then(function(ref) {
              console.info('Item "' + $scope.word.NL + '" removed');
              $state.go('app.add');
            });

         }   

         $scope.saveWord = function(wordObj){

              list.$save($scope.word).then(function(ref) {
                console.info('Item "' + $scope.word.NL + '" modifyed'); 
                $scope.updateMsg($scope.word.NL);
                
              });
         }     

    });        

    $scope.updateMsg = function(text){
          $scope.messageShow = true;
          $scope.message = 'Item "' + text + '" modifyed';

    }    
         
}])

