/**
 * Created by Tallerr on 27.05.2016.
 */
'use strict';
(function() {
  angular
    .module('twitterApp.services', [])
    .factory('twitterService', function ($q, $resource) {

      var authorizationResult = false;
     // var tweetDetails = $resource('/1.1/statuses/show/:id');

      return {

        initialize: function () {
          OAuth.initialize('QGLbf7uigPOnBYPhbSM-2h9UUDc', {cache: true});
          authorizationResult = OAuth.create('twitter');
        },

        isReady: function () {
          return (authorizationResult);
        },

        connectTwitter: function () {
          var deferred = $q.defer();
          OAuth.popup('twitter', {cache: true}, function (error, result) { //cache means to execute the callback if the tokens are already present
            if (!error) {
              authorizationResult = result;
              deferred.resolve();
            } else {
              console.log(error);
            }
          });
          return deferred.promise;
        },

        clearCache: function () {
          OAuth.clearCache('twitter');
          authorizationResult = false;
        },

        getLatestTweets: function () {
          var deferred = $q.defer();
          var promise = authorizationResult.get('/1.1/statuses/home_timeline.json').done(function (data) {
            deferred.resolve(data)
          });
          return deferred.promise;
        },

        getUserProfile: function () {
          var deferred = $q.defer();
          var promise = authorizationResult.get('/1.1/account/verify_credentials.json').done(function (data) {
            deferred.resolve(data)
          });
          return deferred.promise;
        },

        getTweetDetails: function (id) {
          var deferred = $q.defer();
          authorizationResult.get('/1.1/statuses/show.json',{data:{id:id}})
            .done(function (data) {
              deferred.resolve(data);
            });
          return deferred.promise;
        },

        addToFavorite: function (id) {
          console.log(id);
          var deferred = $q.defer();
          authorizationResult.post('/1.1/favorites/create.json',{data:{id:id}})
            .done(function(data) {
              deferred.resolve(data);
            });
          return deferred.promise;
        }
      }

    });
})();
