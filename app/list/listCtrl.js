

/**
 * @file 
 * @constructor
 * 
 */

vocApp.controller('vocListCtrl', ['$scope',
                                  '$timeout',
                                  'wordsData',
                                  'wordListTools', 
                                  '$stateParams',
                                  '$state',
                                  'APP_SETUP',
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
        curPage   : parseInt($stateParams.pageNo), //1 .....
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

    $scope.sorttype = $stateParams.sortingOrder;


    //
    // Sorting order
    //

  

    

    
    //
    // loading initial data
    //
    if(wordsData.listcached) {
      
      //use cache
    //    $scope.shownWords = $scope.allWords.slice($scope.pgn.startElem, $scope.pgn.endElem);

      } else {
      //new request
        wordsData.getList().then(function(list){
        
        $scope.pgn.totalItems = list.length;

        //applying sorting
        $scope.allWordsReady = list.sort($scope.setSorting());

        $scope.shownWords = $scope.allWordsReady.slice($scope.pgn.startElem, $scope.pgn.endElem);
        $scope.loadedData = true;
        
        $scope.pgn.pageLength = parseInt(($scope.pgn.totalItems/APP_SETUP.itemsPP).toFixed()) + 2;

      });

     }         

     /**
     * Only changing the state params
     */
     $scope.changeOrder = function(param){

            $state.go('app.home', {sortingOrder: param});
    }


     /*
       {
          $$hashKey: "object:99"
          $id: "-Jm4VGvH_sOBREfG09gX"
          $priority: null
          EN: {String},
          NL: {String},
          RU: {String},
          stats { closed: {Number},
                  opened: {Number}
                } 
        }
     */
      $scope.setSorting = function (a,b){

        var resultingSort;

          switch ($stateParams.sortingOrder) {

            /** Order by random */
            case 'random':

              resultingSort = function(a,b){
                return (a.$id > b.$id);
              }

              break;

            /** Order by Dutch word name */
            case 'name':

              resultingSort = function(a,b){
                return a.NL.localeCompare(b.NL);
              }

              break;

            /** Order by number of points */
            case 'points':

              resultingSort = function(a,b){
                return (((a.stats) ? a.stats.opened : 0) 
                        - ((b.stats) ? b.stats.opened : 0));
              }

              break;

            default:
              
             resultingSort = function(a,b){
                return (a.opened - b.opened);
              }


              break;
          }


        return resultingSort;
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


