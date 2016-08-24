'use strict';

juke.factory('PlayerFactory', function($rootScope){
  // non-UI logic in here
  

  //default playerFactory status
  var playerFactory = {};
  var audio = document.createElement('audio');
  audio.playStatus = false;



  playerFactory.start = function(song, songList){
    this.pause();
  	audio.src = song.audioUrl;
    audio.load();
    audio.play();
    audio.playStatus = true;
    this.currentSong = song;
    this.songList = songList;
  };
  playerFactory.pause = function(event){
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
    // console.log('reached')
    var index = this.songList.indexOf(this.currentSong);
    index++;
    if(index > this.songList.length - 1) this.start(this.songList[0],this.songList);
    else this.start(this.songList[index],this.songList);
  };
  playerFactory.previous = function(){
    var index = this.songList.indexOf(this.currentSong);
    index--;
    if(index<0) this.start(this.songList[this.songList.length-1],this.songList);
    else this.start(this.songList[index],this.songList);
  };
  playerFactory.getProgress = function(){
    if(!audio.src) return 0;
    return audio.currentTime/audio.duration * 100;
  };


  playerFactory.audio = audio;
  return playerFactory;
});
