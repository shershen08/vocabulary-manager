

vocApp.controller('vocCatCtrl', ['$scope',
                                '$timeout',
                                '$document',
                                'wordsData',
                                '$state', 'APP_SETUP',
  function($scope,
          $timeout,
          $document,
          wordsData,
          $state,
          APP_SETUP){

    //
    // Preloading look
    //
    $scope.loadedData = false;
    $scope.progressState = {width:0};
    $timeout(function(){
        $scope.progressState = {width : '80%'};
    }, 1000);


    $scope.categories = [{
                          'title' : 'Verbs',
                          'id'    : 2,
                          'show'  : true
                        },
                        {
                          'title' : 'Nature',
                          'id'    : 3,
                          'show'  : true
                        },
                        {
                          'title' : 'Basic',
                          'id'    : 5,
                          'show'  : true  
                        },
                        {
                          'title' : 'Objects',
                          'id'    : 6,
                          'show'  : true  
                        },
                        {
                          'title' : 'Phrases',
                          'id'    : 4,
                          'show'  : true  
                        },
                        {
                          'title' : 'Reading',
                          'id'    : 1,
                          'show'  : true  
                        }];
   
    
    //
    // loading initial data
    //
    if(wordsData.listcached) {
      
      //use cache
    //    $scope.shownWords = $scope.allWords.slice($scope.pgn.startElem, $scope.pgn.endElem);

      } else {
      //new request
        wordsData.getList().then(function(list){
        
        $scope.allWordsReady = list;
        $scope.shownWords = $scope.allWordsReady;
        $scope.loadedData = true;


        //
        // Dragula settings
        //
          var conf = {};
          var containers  = [];

          containers.push(document.getElementById('words-container'));

          var conts = document.getElementsByClassName('category-container');
          for (var i = conts.length - 1; i >= 0; i--) {
            containers.push(conts[i]);
          };

          $scope.drake = dragula(containers, conf);

           $scope.drake.on('drop', function(el, container, source){
              console.info($scope.allWordsReady.$getRecord(el.id));
              var word = $scope.allWordsReady.$getRecord(el.id);
                  
                  word.category = container.id;

                  $scope.allWordsReady.$save(word);

           })    


      });

     }     

    
    $scope.addCategory = function(){


    }

    $scope.hideCategory = function(category){
      category.show = !category.show;
    }
                              
    /*

    pointers to array item properties
    */

      /**
   - 'newLanguage'  - the one you learn
   - 'nativeOne'    - translation
   - 'nativeTwo'    - translation optional

   APP_SETUP.setup.newLanguage  == 'NL'
   APP_SETUP.langHash['NL']     == 'Dutch'
  */
   $scope.langs = APP_SETUP.langHash;
   $scope.setup = APP_SETUP.setup;


  //
  // displaying right language
  //
   $scope.langFrom = 'newLanguage';
   $scope.langTo = 'nativeOne';  

      $scope.getFrom = function(w){ 
    return w[$scope.setup[$scope.langFrom]]; 
   }
   $scope.getTo = function(w){ 
    return w[$scope.setup[$scope.langTo]];
  }

  $scope.getToAlt = function(w){ 
    return w[$scope.setup['nativeTwo']];
  }              

  

 

}])


