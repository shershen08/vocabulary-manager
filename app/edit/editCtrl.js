


/**
 * 
 * @constructor
 */

vocApp.controller('vocOneEditCtrl', ['$scope', 'wordsData', '$stateParams', '$state', 
                            function($scope, wordsData, $stateParams, $state){

    $scope.messageShow = false;                      
    /*
    loading initial data
    */
  
        wordsData.getList().then(function(list){

        $scope.word = list.$getRecord($stateParams.itemID);


         $scope.cancelEditing = function(){
            $state.go('home', {pageNo:1});
         }  


          $scope.deleteItem = function(){
            
            list.$remove($scope.word).then(function(ref) {
              console.info('Item "' + $scope.word.text + '" removed');
              $state.go('add');
            });

         }   

         $scope.saveWord = function(wordObj){

              list.$save($scope.word).then(function(ref) {
                console.info('Item "' + $scope.word.text + '" modifyed'); 
                $scope.updateMsg($scope.word.text);
                
              });
         }     

    });        

    $scope.updateMsg = function(text){
          $scope.messageShow = true;
          $scope.message = 'Item "' + text + '" modifyed';

    }    
         
}])

