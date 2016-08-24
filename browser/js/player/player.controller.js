/* global juke */
'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  // var audio = document.createElement('audio');
  
  PlayerFactory.audio.addEventListener('ended', function () {
    $scope.next();
    // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
    $scope.$evalAsync(); // likely best, schedules digest if none happening
  });
  PlayerFactory.audio.addEventListener('timeupdate', function () {
    $scope.progress = PlayerFactory.getProgress();
    // $scope.$digest(); // re-computes current template only (this scope)
    $scope.$evalAsync(); // likely best, schedules digest if none happening
  });


  $scope.showFooter = function(){
    return PlayerFactory.isPlaying();
  };

  // state
  $scope.playing = PlayerFactory.isPlaying;

  // main toggle
  $scope.toggle = function () {
    var song = PlayerFactory.getCurrentSong();
    if($scope.playing() && song === $scope.currentSong){
      PlayerFactory.pause();
    } else {
      if(!$scope.playing() && song === $scope.currentSong){
        PlayerFactory.resume();
      } else {
        PlayerFactory.start(song, PlayerFactory.songList);
        $scope.currentSong = PlayerFactory.getCurrentSong();
      }
      
    }
  };

  $scope.prev = PlayerFactory.previous.bind(PlayerFactory);
  $scope.next = PlayerFactory.next.bind(PlayerFactory);


  // $scope.toggle = function (song) {
  //   if ($scope.playing) $rootScope.$broadcast('pause');
  //   else $rootScope.$broadcast('play', song);
  // };

  // incoming events (from Album or toggle)
  // $scope.$on('pause', PlayerFactory.pause.bind(PlayerFactory));
  // $scope.$on('play', PlayerFactory.start.bind(PlayerFactory));

  // functionality
  // function pause () {
  //   audio.pause();
  //   $scope.playing = false;
  // }



  // function play (event, song){
  //   // stop existing audio (e.g. other song) in any case
  //   pause();
  //   $scope.playing = true;
  //   // resume current song
  //   if (song === $scope.currentSong) return audio.play();
  //   // enable loading new song
  //   $scope.currentSong = song;
  //   audio.src = song.audioUrl;
  //   audio.load();
  //   audio.play();
  // }



  // outgoing events (to Album… or potentially other characters)
  // $scope.next = function () { PlayerFactory.pause(); $rootScope.$broadcast('next'); };
  // $scope.prev = function () { PlayerFactory.pause(); $rootScope.$broadcast('prev'); };

  function seek (decimal) {
    PlayerFactory.audio.currentTime = PlayerFactory.audio.duration * decimal;
  }

  $scope.handleProgressClick = function (evt) {
    seek(evt.offsetX / evt.currentTarget.scrollWidth);
  };

});
