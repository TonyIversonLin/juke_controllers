'use strict';

juke.factory('ArtistsFactory', function($http){
	var ArtistsFactory = {};
	ArtistsFactory.fetchAllArtists = function(){
		return $http.get('/api/artists')
			.then(function(res){return res.data});
	};
	return ArtistsFactory;

})