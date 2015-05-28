/**
 * @file 
 * @author 
 */
 
vocApp.service('translateWord',
              ['$http',
               '$q',
               function($http,
                        $q){

  /**
  *  https://tech.yandex.com/translate/doc/dg/reference/translate-docpage/
  *
  **/

  this.setApiKey = function(key){
    this.key = key;
  }


  this.getWord = function(wordToTranslate) {

      var key = this.key,
            lang = 'nl-ru',
            deferred = $q.defer(),
            
            url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + 
                         key + '&lang=' + lang + '&text=' + wordToTranslate;

            $http.get(url).success(function (data) {
                  
                  var result = {};

                  if(data.text[0] == wordToTranslate){

                    result =  {"result": data.text[0],
                               "statusText": "Not found",
                              "status": 0};

                  } else {

                    result =  {"result": data.text[0],
                                "statusText": "Translated",
                                "status": 1};

                  }


                deferred.resolve(result);
            })

            return deferred.promise;
     
  };

}]);




var MY_FIREBASE_URL = 'PUT_FIREBASE_APP_URL_HERE';



vocApp.factory('wordListTools', function(){
  return {
    randomizeList : function (array) {
          var currentIndex = array.length, temporaryValue, randomIndex ;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }

          return array;
        },

    validateInput : function(wordObj){

        if(!wordObj) return 'No word provided';

        if(wordObj.newLanguage == '') return 'No word provided';

        if(wordObj.nativeTwo == '' && wordObj.nativeOne == '') return 'No translation provided';

        return true;

    }

  }
})


vocApp.service('categoryData', ['$firebaseArray',
                                '$q',
                                function($firebaseArray,
                                          $q){

    this.ref = new Firebase(MY_FIREBASE_URL + "/categories");
    this.cache = {};

/**

almost ready script for title movign - do with angular!

    var type, i = 0, ctd = document.title, iID = setInterval(function(){ 
      if(!type && i < ctd.length && document.title != '') {
        document.title = document.title.toString().substr(i);i++;
        console.info(document.title, i);
      } else {
        type = true;document.title = ctd.toString().substr(i);i--;
        console.info(document.title, i);
      }
      if (type && i==-1) {
        i = 0;type = false;clearInterval(iID);
      }
    }, 200);
*/
}])



vocApp.service('userData', ['$firebaseArray',
                            '$q',
                            function($firebaseArray,
                                    $q){

    this.ref = new Firebase(MY_FIREBASE_URL + "/users");
    this.cache = {};

    this.authRef = function(){
      return this.ref ;
    }

    this.getArrayLink = function(){
      var deferred = $q.defer();

      $firebaseArray(this.ref).$loaded().then(function(list){
          deferred.resolve(list);
          this.cache = list;
      }) 

      return deferred.promise;
    }


    this.getUser = function(uid){
      var deferred = $q.defer();

      this.getArrayLink().then(function(list){
          deferred.resolve(list.$getRecord(uid));
      })  

      return deferred.promise;
    }

     this.addUser = function(userObject){
      var deferred = $q.defer();

      var dbObj = {};
      dbObj[userObject.uid] = userObject;
      dbObj['Created']      = Date();

      this.getArrayLink().then(function(list){
          list.$add(dbObj);
      })  

    }
}])

vocApp.service('wordsData', ['$firebaseArray',
                              '$q',
                              function($firebaseArray,
                                      $q){

    this.ref = new Firebase(MY_FIREBASE_URL + "/words");

    this.listCache = {};
    this.listcached = false;


    this.getList = function(){
      var deferred = $q.defer();
      
      return $firebaseArray(this.ref).$loaded();
    }

    this.setCache = function(receivedArray){
      this.listCache = receivedArray;
      this.listcached = true;
    }

}])