angular.module('newApp', ['ngResource', 'spotifyService'])
    .controller('mainController', function($scope, $http, $filter, Artist) {

        $scope.searchTerm = "";

        $scope.validSearch = function(searchTerm) {
            var regexInput = /\W/;
            return regexInput.test(searchTerm);
        }

        Artist.searchArtist($scope.searchTerm)
            .then(function(aristData) {
                console.log(artistData);
            })

        $scope.doSearch = function(searchTerm) {
            $scope.validSearch(searchTerm);
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
                $scope.searchedArtist = response.data.artists.items[0];
                $scope.searchTerm = "";
                $scope.getRelatedArtists();
            })
            .catch(function(error) {
                console.log(error);
            })
        };

        $scope.getRelatedArtists = function() {
            $http({
                method: 'GET',
                url: 'https://api.spotify.com/v1/artists/' + $scope.artistId + '/related-artists'
            })
            .then(function(response) {
                $scope.relatedArtists = $filter('limitTo')(response.data.artists, '5');
            })
        }

        $scope.rankArtists = function(relatedArtists, searchedArtist) {
            relatedArtists.push(searchedArtist);

            relatedArtists.sort(function(a, b) {
                return a.followers.total - b.followers.total;
            })

            relatedArtists.reverse();

            console.log(relatedArtists);
        }

    });
