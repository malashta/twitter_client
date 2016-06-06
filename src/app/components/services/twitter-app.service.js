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
      var STATUS_UPDATE_URL = '/1.1/statuses/update.json';
   //   var STATUS_MENTIONS_URL = '/1.1/statuses/mentions_timeline.json';
      var USER_TIMELINE_URL = '/1.1/statuses/user_timeline.json';
      var USER_DETAILS_URL = '/1.1/users/show.json';
      var STATUSES_SHOW_URL = '/1.1/statuses/show.json';
      var FAVORITES_CREATE_URL = '/1.1/favorites/create.json';
   //   var DIRECT_MESSAGE_URL = '/1.1/direct_messages/new.json';
      var STATUSES_RETWEET_URL = '/1.1/statuses/retweet/';

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
        getLatestTweets: function () { return getRequest(HOME_TIMELINE_URL); },

        getUserTimeline: function (screen_name) { return getRequest(USER_TIMELINE_URL,{screen_name:screen_name}); },

        getUserProfile: function () { return getRequest(VERIFY_CREDENTIALS_URL); },

        getUserDetails: function (screen_name) { return getRequest(USER_DETAILS_URL,{screen_name:screen_name}); },

        getTweetDetails: function (id) { return getRequest(STATUSES_SHOW_URL,{id:id}); },

        addToFavorite: function (id) { return postRequest(FAVORITES_CREATE_URL,{id:id}); },

        addStatusesRetweet: function (mess) { return postRequest(STATUSES_RETWEET_URL+mess.id+'.json'); },

        addStatusesUpdate: function(mess) { return postRequest(STATUS_UPDATE_URL,mess)}
      }
    })

    .factory('$twitterHelpers', function($q, $http) {

      function createSignature(method, endPoint, headerParameters, bodyParameters, secretKey, tokenSecret) {
        if(typeof jsSHA !== "undefined") {
          var headerAndBodyParameters = angular.copy(headerParameters);
          var bodyParameterKeys = Object.keys(bodyParameters);
          for(var i = 0; i < bodyParameterKeys.length; i++) {
            headerAndBodyParameters[bodyParameterKeys[i]] = escapeSpecialCharacters(bodyParameters[bodyParameterKeys[i]]);
          }
          var signatureBaseString = method + "&" + encodeURIComponent(endPoint) + "&";
          var headerAndBodyParameterKeys = (Object.keys(headerAndBodyParameters)).sort();
          for(i = 0; i < headerAndBodyParameterKeys.length; i++) {
            if(i == headerAndBodyParameterKeys.length - 1) {
              signatureBaseString += encodeURIComponent(headerAndBodyParameterKeys[i] + "=" + headerAndBodyParameters[headerAndBodyParameterKeys[i]]);
            } else {
              signatureBaseString += encodeURIComponent(headerAndBodyParameterKeys[i] + "=" + headerAndBodyParameters[headerAndBodyParameterKeys[i]] + "&");
            }
          }
          var oauthSignatureObject = new jsSHA(signatureBaseString, "TEXT");

          var encodedTokenSecret = '';
          if (tokenSecret) {
            encodedTokenSecret = encodeURIComponent(tokenSecret);
          }

          headerParameters.oauth_signature = encodeURIComponent(oauthSignatureObject.getHMAC(encodeURIComponent(secretKey) + "&" + encodedTokenSecret, "TEXT", "SHA-1", "B64"));
          var headerParameterKeys = Object.keys(headerParameters);
          var authorizationHeader = 'OAuth ';
          for(i = 0; i < headerParameterKeys.length; i++) {
            if(i == headerParameterKeys.length - 1) {
              authorizationHeader += headerParameterKeys[i] + '="' + headerParameters[headerParameterKeys[i]] + '"';
            } else {
              authorizationHeader += headerParameterKeys[i] + '="' + headerParameters[headerParameterKeys[i]] + '",';
            }
          }
          return { signature_base_string: signatureBaseString, authorization_header: authorizationHeader, signature: headerParameters.oauth_signature };
        } else {
          return "Missing jsSHA JavaScript library";
        }
      }

      function createNonce(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(var i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      }

      function escapeSpecialCharacters(string) {
        var tmp = encodeURIComponent(string);
        tmp = tmp.replace(/\!/g, "%21");
        tmp = tmp.replace(/\'/g, "%27");
        tmp = tmp.replace(/\(/g, "%28");
        tmp = tmp.replace(/\)/g, "%29");
        tmp = tmp.replace(/\*/g, "%2A");
        return tmp;
      }

      function transformRequest(obj) {
        var str = [];
        for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + escapeSpecialCharacters(obj[p]));
        console.log(str.join('&'));
        return str.join('&');
      }

      return {
        createTwitterSignature: function(method, url, bodyParameters, clientId, clientSecret, token) {
          var oauthObject = {
            oauth_consumer_key: clientId,
            oauth_nonce: createNonce(10),
            oauth_signature_method: "HMAC-SHA1",
            oauth_token: token.oauth_token,
            oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
            oauth_version: "1.0"
          };
          var signatureObj = createSignature(method, url, oauthObject, bodyParameters, clientSecret, token.oauth_token_secret);
          $http.defaults.headers.common.Authorization = signatureObj.authorization_header;
          return signatureObj;
        },
        transformRequest: transformRequest
      };
    });
})();
