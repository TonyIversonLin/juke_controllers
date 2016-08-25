'use strict';

juke.controller('ArtistCtrl', function ($scope, $rootScope, ArtistsFactory,PlayerFactory,$q) {
	$scope.$on('viewSwap',function(event,data){
		$scope.showMe = (data.name === 'oneArtist');
		if(!$scope.showMe) return;
		$scope.id = data.id;
		console.log(data.id)

		var gettingArtist = ArtistsFactory.fetchOneArtist(data.id);
		var gettingAlbums = ArtistsFactory.fetchAllAlbum(data.id);
		var gettingSongs = ArtistsFactory.fetchAllSongs(data.id);

		$q.all([gettingArtist,gettingAlbums,gettingSongs])
			.then(function(result){
				var artist = result[0];
				var albums = result[1];
				var songs = result[2];
				albums.forEach(function(album){
					album.imageUrl = '/api/albums/' + album.id + '/image';
				});
				songs.forEach(function(song, i){
        		song.audioUrl = '/api/songs/' + song.id + '/audio';
        		song.albumIndex = i;
      			});							
				$scope.name = artist.name;
				$scope.albums = albums;
				$scope.songs = songs;
			});
	});



	$scope.playing = PlayerFactory.isPlaying;

	$scope.getCurrentSong = function(){
	  return PlayerFactory.getCurrentSong(); 
	}
	  // main toggle
	  $scope.toggle = function (song) {
	    if($scope.playing() && song === $scope.currentSong){
	      PlayerFactory.pause();
	    } else {
	      if(!$scope.playing() && song === $scope.currentSong){
	        PlayerFactory.resume();
	      } else {
	        PlayerFactory.start(song, $scope.songs);
	        $scope.currentSong = PlayerFactory.getCurrentSong(); 
	      }
	    }
	  };
})