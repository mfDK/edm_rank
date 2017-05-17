angular.module('newApp', ['ngResource', 'spotifyService'])
    .controller('mainController', function($scope, $http, $filter, Artist) {

        $scope.searchTerm = "";

        $scope.validSearch = function(searchTerm) {
            var regexInput = /\W/;
            return regexInput.test(searchTerm);
        }

        $scope.submitSearch = function() {
            Artist.searchArtist($scope.searchTerm)
                .then(function(data) {
                    $scope.data = data;
                    $scope.genres = $filter('limitTo')(data.artists.items[0].genres, '5');
                    $scope.name = data.artists.items[0].name;
                    $scope.img = data.artists.items[0].images[1].url;
                    $scope.followers = data.artists.items[0].followers.total;
                    $scope.artistId = data.artists.items[0].id;
                    $scope.searchedArtist = data.artists.items[0];
                    $scope.getRelatedArtists($scope.artistId);
                    $scope.searchTerm = "";
                })
        }

        $scope.getRelatedArtists = function(artistId) {
            Artist.relatedArtists(artistId)
                .then(function(response) {
                    $scope.relatedArtists = $filter('limitTo')(response, '5');
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
