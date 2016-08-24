'use strict';

juke.factory('PlayerFactory', function($rootScope){
  // non-UI logic in here
  


  var playerFactory = {};
  playerFactory.start = function(song){
  	
  };
  playerFactory.pause = function(){};
  playerFactory.resume = function(){};
  playerFactory.isPlaying = function(){};
  playerFactory.getCurrentSong = function(){};
  playerFactory.next = function(){};
  playerFactory.previous = function(){};
  playerFactory.getProgress = function(){};



  return playerFactory;
});
