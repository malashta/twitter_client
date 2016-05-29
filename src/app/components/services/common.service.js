/**
 * Created by Tallerr on 29.05.2016.
 */
(function(){
  angular
    .module('commonServices',[])
    .factory( '$mediator', function( $rootScope ) {
      return $rootScope.$new( true ); // isolate
    })
})();
