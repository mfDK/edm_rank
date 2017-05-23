angular.module('newApp', ['ngResource', 'spotifyService', 'ngAnimate'])
    .controller('mainController', function($scope, $http, $filter, Spotify) {

        $scope.searchTerm = "";

        $scope.validSearch = function(searchTerm) {
            var regexInput = /\W/;
            return regexInput.test(searchTerm);
        }

        $scope.submitSearch = function() {
            Spotify.searchArtist($scope.searchTerm)
                .then(function(data) {
                    $scope.data = data;
                    $scope.genres = $filter('limitTo')(data.artists.items[0].genres, '5');
                    $scope.name = data.artists.items[0].name;
                    $scope.img = data.artists.items[0].images[1].url;
                    $scope.followers = $filter('number')(data.artists.items[0].followers.total, 0);
                    $scope.artistId = data.artists.items[0].id;
                    $scope.searchedArtist = data.artists.items[0];
                    $scope.getRelatedArtists($scope.artistId);
                    $scope.searchTerm = "";
                })
        }

        $scope.getRelatedArtists = function(artistId) {
            Spotify.relatedArtists(artistId)
                .then(function(response) {
                    $scope.relatedArtists = $filter('limitTo')(response, '6');
                    console.log($scope.relatedArtists);
                })
        }

        $scope.rankArtists = function(relatedArtists) {
            relatedArtists.sort(function(a, b) {
                return a.followers.total - b.followers.total;
            })
            relatedArtists.reverse();
        }

        $scope.getTopTracks = function(artistId) {
            Spotify.getTopTracks(artistId)
                .then(function(response) {
                    $scope.topTracks = $filter('limitTo')(response, '3');
                    console.log($scope.topTracks);
                })

        }

    });
