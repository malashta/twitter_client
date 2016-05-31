/**
 * Created by Tallerr on 27.05.2016.
 */
'use strict';
(function() {
  angular
    .module('twitterApp.services', [])
    .factory('twitterService', function ($q, $window, $log) {

      var authorizationResult = false;
      var HOME_TIMELINE_URL = '/1.1/statuses/home_timeline.json';
      var VERIFY_CREDENTIALS_URL = '/1.1/account/verify_credentials.json';
   //   var SEARCH_TWEETS_URL = '/1.1/search/tweets.json';
   //   var STATUS_UPDATE_URL = '/1.1/statuses/update.json';
   //   var STATUS_MENTIONS_URL = '/1.1/statuses/mentions_timeline.json';
   //   var USER_TIMELINE_URL = '/1.1/statuses/user_timeline.json';
   //   var USER_DETAILS_URL = '/1.1/users/show.json';
      var STATUSES_SHOW_URL = '/1.1/statuses/show.json';
      var FAVORITES_CREATE_URL = '/1.1/favorites/create.json';

      function getRequest(url, data) {
        if(typeof(data)==='undefined')data={};
        var deferred = $q.defer();
        authorizationResult.get(url,{data:data}).done(function (data) {
          deferred.resolve(data)
        });
        return deferred.promise;
      }

      function postRequest(url, data) {
        var deferred = $q.defer();
        if (typeof(data)==='undefined') data = {};
        authorizationResult.post(url,{data:data}).done(function (data) {
          deferred.resolve(data)
        });
        return deferred.promise;
      }

      return {

        initialize: function () {
          $window.OAuth.initialize('QGLbf7uigPOnBYPhbSM-2h9UUDc', {cache: true});
          authorizationResult = $window.OAuth.create('twitter');
        },

        isReady: function () {return (authorizationResult);},

        connectTwitter: function () {
          var deferred = $q.defer();
          $window.OAuth.popup('twitter', {cache: true}, function (error, result) {
            if (!error) {
              authorizationResult = result;
              deferred.resolve();
            } else {
              $log.log(error);
            }
          });
          return deferred.promise;
        },

        clearCache: function () {
          $window.OAuth.clearCache('twitter');
          authorizationResult = false;
        },

        //Twitter API methods
        getLatestTweets: function () {return getRequest(HOME_TIMELINE_URL);},

        getUserProfile: function () {return getRequest(VERIFY_CREDENTIALS_URL);},

        getTweetDetails: function (id) {return getRequest(STATUSES_SHOW_URL,{id:id});},

        addToFavorite: function (id) {return postRequest(FAVORITES_CREATE_URL,{id:id})}
      }
    });
})();
