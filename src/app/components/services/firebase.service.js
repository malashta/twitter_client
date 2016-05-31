/**
 * Created by smalashta on 31.05.16.
 */
(function(){
  angular
    .module('dataStorage',[])
    .value('firebasePath',function(){ return 'https://resplendent-fire-8365.firebaseio.com'; })
    .factory('baseActions',function(firebasePath){

      return{
        initBase:function(){},
        setActiveFrame:function(){},
        setCloseFrame:function(){},
        setDataToFrame:function(){},
        clearFrameDate:function(){},
        setActionToFrame:function(){},
        clearActionToFrame:function(){}
      }
    })
})();
