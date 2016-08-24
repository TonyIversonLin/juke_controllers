'use strict';

juke.controller('AlbumsCtrl', function($scope, AlbumFactory){

	AlbumFactory.fetchAll()
		.then(function(albums){
			albums.forEach(function(album){
				album.imageUrl = '/api/albums/' + album.id + '/image';
			})

			$scope.albums = albums;
		});


})