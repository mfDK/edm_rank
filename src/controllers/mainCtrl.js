angular.module('newApp', ['ngResource'])
    .controller('mainController', function($scope, $http, $filter) {
        $scope.searchTerm = "";

        $scope.doSearch = function(searchTerm) {
            $http({
                method: 'GET',
                url: 'https://api.spotify.com/v1/search?q=' + searchTerm + '&type=artist'
            })
            .then(function(response) {
                $scope.result = response.data.artists;
                $scope.genres = $filter('limitTo')(response.data.artists.items[0].genres, '5');
                $scope.name = response.data.artists.items[0].name;
                $scope.img = response.data.artists.items[0].images[1].url;
                $scope.followers = response.data.artists.items[0].followers.total;
                $scope.artistId = response.data.artists.items[0].id;
                $scope.searchTerm = "";
            })
        };

    });
