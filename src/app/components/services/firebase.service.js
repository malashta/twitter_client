/**
 * Created by smalashta on 31.05.16.
 */
(function(){
  angular
    .module('dataStorage',[])
    .factory('baseActions',function($firebaseObject, $window){

      var auth;

      return{
        initBase:function(){
          var ref = new $window.Firebase('https://resplendent-fire-8365.firebaseio.com');
          auth = $firebaseObject(ref);
          return auth;
        },
        setActiveFrame:function(){},
        setCloseFrame:function(){},
        setDataToFrame:function(){},
        clearFrameDate:function(){},
        setActionToFrame:function(){},
        clearActionToFrame:function(){}
      }
    })
})();
