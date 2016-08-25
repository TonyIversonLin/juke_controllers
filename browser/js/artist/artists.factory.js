'use strict';

juke.factory('ArtistsFactory', function($http){
	var ArtistsFactory = {};
	ArtistsFactory.fetchAllArtists = function(){
		return $http.get('/api/artists')
			.then(function(res){return res.data});
	};
	ArtistsFactory.fetchOneArtist = function(artistID){
		console.log(artistID);
		return $http.get('/api/artists/'+artistID)
			.then(function(res){return res.data});
	};

	ArtistsFactory.fetchAllAlbum = function(artistID){
		return $http.get('/api/artists/'+artistID+'/albums')
			.then(function(res){return res.data});
	}
	ArtistsFactory.fetchAllSongs = function(artistID){
		return $http.get('/api/artists/'+artistID+'/songs')
			.then(function(res){return res.data});
	}


	return ArtistsFactory;

})