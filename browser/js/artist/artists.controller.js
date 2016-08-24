'use strict';

juke.controller('ArtistsCtrl', function ($scope, $rootScope, ArtistsFactory) {

	ArtistsFactory.fetchAllArtists()
		.then(function(artists){
			$scope.artists = artists;
		})

	$rootScope.$on('viewSwap', function(event, data){
		$scope.showMe = (data.name === 'allArtists');
	});	
})