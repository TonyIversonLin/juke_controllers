/* global juke */
'use strict';

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

  AlbumFactory.fetchById(1)
    .then(function(album){
      album.imageUrl = '/api/albums/' + album.id + '/image';
      album.songs.forEach(function(song, i){
        song.audioUrl = '/api/songs/' + song.id + '/audio';
        song.albumIndx = i;
      });

      StatsFactory.totalTime(album)
        .then(albumDuration => album.fullDuration = albumDuration / 60);

      return album;
    })
    .then(album => $scope.album = album)
    .catch($log.error); // $log service can be turned on and off; also, pre-bound


$scope.playing = PlayerFactory.isPlaying;


  // main toggle
  $scope.toggle = function (song) {
    if($scope.playing() && song === $scope.currentSong){
      PlayerFactory.pause();
    } else {
      if(!$scope.playing() && song === $scope.currentSong){
        PlayerFactory.resume();
      } else {
        PlayerFactory.start(song, $scope.album.songs);
        $scope.currentSong = PlayerFactory.getCurrentSong();  
      }
    }
  };

  // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', PlayerFactory.pause.bind(PlayerFactory));
  // $scope.$on('play', PlayerFactory.start.bind(PlayerFactory));
  // $scope.$on('next', PlayerFactory.next.bind(PlayerFactory));
  // $scope.$on('prev', PlayerFactory.previous.bind(PlayerFactory));

  // functionality
  // function pause () {
  //   $scope.playing = false;
  // }
  // function play (event, song) {
  //   $scope.playing = true;
  //   $scope.currentSong = song;
  // }

  // a "true" modulo that wraps negative to the top of the range
  // function mod (num, m) { return ((num % m) + m) % m; }

  // jump `interval` spots in album (negative to go back, default +1)
  // function skip (interval) {
  //   if (!$scope.currentSong) return;
  //   var index = $scope.currentSong.albumIndex;
  //   index = mod( (index + (interval || 1)), $scope.album.songs.length );
  //   $scope.currentSong = $scope.album.songs[index];
  //   if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  // }
  // function next () { skip(1); }
  // function prev () { skip(-1); }

});
