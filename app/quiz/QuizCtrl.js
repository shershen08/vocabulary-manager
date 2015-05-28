
/**
 * @file 
 * @constructor
 */

vocApp.controller('vocQuizCtrl', ['$scope', 
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


     $scope.counter = {
                       "correct"  : 0,
                       "wrong"    : 0
                     }   

    /**
    *
    */
    $scope.getAnotherRandom = function(){
      $scope.correctAnswer = '';
      $scope.selectedID = '';

      $scope.showWord = getRandomQuestion();

      var answers = getRandomAnswers();
      answers.push($scope.showWord)
      answers = _.shuffle(answers);

      $scope.answerOptions = answers;
      
    }

    var getRandomQuestion = function(){

      return _.sample($scope.words);
    }

    /**
    * Generates array with number of other words strings
    */
    var getRandomAnswers = function(){

       var optionsNumber = _.random(2,5);
           answerOptions = [];

      for (var i = optionsNumber - 1; i >= 0; i--) {
        answerOptions.push(getRandomQuestion());
      };

      return answerOptions;

    }

    $scope.setAnswer = function(selectedLine){

      $scope.selectedID = selectedLine.$id;

      $scope.correctAnswer = ($scope.showWord.$id == selectedLine.$id);
      if($scope.correctAnswer){
        $scope.counter.correct++;
      } else {
        $scope.counter.wrong++;
      }

    }



    /**
    * Loading word list
    */
    wordsData.getList().then(function(list){

      $scope.words = list;
      wordsData.setCache(list);

      $scope.getAnotherRandom();

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




}]);