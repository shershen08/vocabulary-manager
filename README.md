

##How to start 
* Clone the repo
* Run `bower install`
* Run localhost server of choise (for example https://www.npmjs.com/package/watch-http-server)

###If planning to deploy to Firebase apps hosting
* Install firebase CLI tool `npm firebase -g`
* Add your app addred in firebase.json or run `firebase init` in app folder

###Libraries used 

* Angular, Angular-ui-router, Angularfire, Angular-touch
* lodash
* bootstrap-css
* dragula.js


###DB structure
```
/words
  EN,NL,RU
/users
  /settings
  /stats

/connections 
```

###Genegal info

names of the fileds in template layer:
* 'newLanguage' - the one you learn
* 'nativeOne' - translation
* 'nativeTwo' - translation optional


###Todo's

* LocalStorage
* Categories
* Statistics
* Additional languages
