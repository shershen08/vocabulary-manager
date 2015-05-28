
/**
 * @file
 * @constructor
 */

vocApp.controller('vocAddCtrl', ['$scope', 
                                 '$timeout',
                                 '$state',
                                 'wordListTools',
                                 'wordsData',
                                 'translateWord',
                                 'APP_SETUP', 
    function($scope,
            $timeout,
            $state,
            wordListTools,
            wordsData,
            translateWord,
            APP_SETUP){

    $scope.message = {};
    $scope.messageShow = false;

    wordsData.getList().then(function(list){

      $scope.words = list;
      wordsData.setCache(list);

    });


  /**
   - 'newLanguage'  - the one you learn
   - 'nativeOne'    - translation
   - 'nativeTwo'    - translation optional

   APP_SETUP.setup.newLanguage  == 'NL'
   APP_SETUP.langHash['NL']     == 'Dutch'
  */
   $scope.langs = APP_SETUP.langHash;
   $scope.setup = APP_SETUP.setup;



   translateWord.setApiKey(APP_SETUP.YAPI.key);





  $scope.$watch('word.newLanguage', function(newVal){
    
    if (!newVal || newVal.length < 3) {
      $scope.simmularWords = [];
      $scope.translationResults = '';
      return;
    }

    $scope.simmularWords = _.filter($scope.words, function(item){
        return (item[APP_SETUP.setup.newLanguage].indexOf(newVal) > -1);
    });

  })



  $scope.getTranslation = function(){

    translateWord.getWord($scope.word.newLanguage).then(function(res){

         $scope.translationResults = res;

    })
  }

  $scope.copyTranslation = function(){

    $scope.word.nativeTwo = $scope.translationResults.result;

  }


  /**
   * Processes the added word
   * 
   * @param {object} item         - Details of the word
   * @param {boolean} addWordStay - What to do next afetr saving
   */
    $scope.addWord = function(item, addWordStay) {
        $scope.messageShow = true;

        if(wordListTools.validateInput(item) !== true){

            $scope.message.text = wordListTools.validateInput(item);
            $scope.message.type = 'danger';

            //** hide notification */
            $timeout(function(){
              $scope.message.type = undefined;
            }, 1000);
            
            return;
        } 

        var obj = {};
        obj[APP_SETUP.setup.newLanguage] = item.newLanguage.toLowerCase();
        obj[APP_SETUP.setup.nativeOne] = item.nativeOne.toLowerCase() || '';
        obj[APP_SETUP.setup.nativeTwo] = item.nativeTwo.toLowerCase() || '';
        obj['createDate'] = Date();

        $scope.words.$add(obj);

        if(addWordStay) {
          $state.go('home', {pageNo:1});
        } else {
          $scope.message.text = ' saved!';
          $scope.message.word = item.newLanguage;
          $scope.message.type = 'success';
          $scope.focusInput = true;

          //** hide notification */
          $timeout(function(){
            $scope.message.type = undefined;
          }, 1000);

        }

        $scope.word.newLanguage = '';
        $scope.word.nativeOne = '';
        $scope.word.nativeTwo = '';
        $scope.simmularWords = [];

  }; 

}])
