'use strict';

juke.factory('PlayerFactory', function($rootScope){
  // non-UI logic in here
  

  //default playerFactory status
  var playerFactory = {};
  var audio = document.createElement('audio');
  audio.playStatus = false;



  playerFactory.start = function(song,songList){
    this.pause();
  	audio.src = song.audioUrl;
    audio.load();
    audio.play();
    audio.playStatus = true;
    this.currentSong = song;
    this.songList = songList;
  };
  playerFactory.pause = function(){
      audio.pause();
      audio.playStatus = false;
  };
  playerFactory.resume = function(){
    audio.play();
    audio.playStatus = true;
  };
  playerFactory.isPlaying = function(){
    return audio.playStatus;
  };
  playerFactory.getCurrentSong = function(){
    return this.currentSong || null;
  };
  playerFactory.next = function(){
    var index = this.songList.indexOf(this.currentSong);
    index++;
    if(index>this.songList.length-1) this.start(this.songList[0]);
    else this.start(this.songList[index]);
  };
  playerFactory.previous = function(){
    var index = this.songList.indexOf(this.currentSong);
    index--;
    if(index<0) this.start(this.songList[this.songList.length-1]);
    else this.start(this.songList[index]);

  };
  playerFactory.getProgress = function(){
    if(!audio.src) return 0;
    console.log(audio.currentTime);
    console.log(audio.duration);
    return audio.currentTime/audio.duration;
  };



  return playerFactory;
});
