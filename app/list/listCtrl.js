

vocApp.controller('vocListCtrl', ['$scope', '$timeout','wordsData', 'wordListTools', '$stateParams', '$state', 'APP_SETUP',
  function($scope,
          $timeout,
          wordsData,
          wordListTools,
          $stateParams,
          $state,
          APP_SETUP){

    //
    // Pagination
    //
    $scope.pgn = {
        curPage   : $stateParams.pageNo, //1 .....
        startElem : APP_SETUP.itemsPP*($stateParams.pageNo-1),
        endElem   : APP_SETUP.itemsPP*$stateParams.pageNo
    }

    //
    // Preloading look
    //
    $scope.loadedData = false;
    $scope.progressState = {width:0};
    $timeout(function(){
        $scope.progressState = {width : '80%'};
    }, 1000);


    //
    // Sorting order
    //

   $scope.filterOption = [
                        {name:'random', title:'Random'},
                        {name:'createDate', title:'By date added'},
                        {name:'newLanguage', title:'By NL alpabetically'},
                        {name:'nativeOne', title:'By En alpabetically'}
                      ];  
                            
    if($stateParams.sortingOrder){
      $scope.itemsOrder = {name : $stateParams.sortingOrder, title:$stateParams.sortingOrder};
    } else {
      $scope.itemsOrder = $scope.filterOption[1];
    }

       $scope.$watch('itemsOrder', function(newval){
        
        if(newval.name == 'random') {
          $scope.allWordsReady = wordListTools.randomizeList($scope.allWordsReady);
        } 

     });    

    

    
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
        $scope.pgn.totalItems = $scope.allWordsReady.length;

        $scope.shownWords = $scope.allWordsReady.slice($scope.pgn.startElem, $scope.pgn.endElem);
        $scope.loadedData = true;
        
        $scope.pgn.pageLength = parseInt(($scope.pgn.totalItems/APP_SETUP.itemsPP).toFixed()) + 2;

      });

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

   $scope.switchLangs = function(){

      var _tmp = $scope.langFrom;

      $scope.langFrom = $scope.langTo;
      $scope.langTo = _tmp;  

   }           
   $scope.getFrom = function(w){ 
    return w[$scope.setup[$scope.langFrom]]; 
   }
   $scope.getTo = function(w){ 
    return w[$scope.setup[$scope.langTo]];
  }

  $scope.getToAlt = function(w){ 
    return w[$scope.setup['nativeTwo']];
  }              

   /*
   Sets word as opened once
   */
   $scope.markWord = function(w){

    var _stats  = w.stats || {'opened': 0, 'closed':0};
    _stats.opened = _stats.opened + 1;
    w.stats = _stats;

    $scope.allWordsReady.$save(w).then(function(ref) {
      console.info('Stats for "' + w[$scope.setup[$scope.langTo]] + '" saved. opened:', _stats.opened); 
      w.toggle = !w.toggle;

    });
    $scope.safeApply();
   }

   /*
   Sets word as closed once
   */
     $scope.hideWord = function(w){

      var _stats  = w.stats || {'opened': 0, 'closed':0};
      _stats.closed = _stats.closed + 1;
      w.stats = _stats;

      $scope.allWordsReady.$save(w).then(function(ref) {
          console.info('Stats for "' + w[$scope.setup[$scope.langTo]] + '" saved. closed:', _stats.closed); 
          w.hide = true;
      });
     $scope.safeApply();
    }
 
  

}])


