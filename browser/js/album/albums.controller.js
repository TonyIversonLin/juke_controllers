'use strict';

juke.controller('AlbumsCtrl', function($scope, $rootScope, AlbumFactory){
	AlbumFactory.fetchAll()
	.then(function(albums){
		//console.log(albums)
		albums.forEach(function(album){
			album.imageUrl = '/api/albums/' + album.id + '/image';
		})

		$scope.albums = albums;
	});
	$rootScope.$on('viewSwap', function(event, data){
		$scope.showMe = (data.name === 'allAlbums');

	});

	$scope.viewOneAlbum = function(id){
		console.log(id);
		$rootScope.$broadcast('viewSwap', {name: 'oneAlbum',id: id})
	};

})