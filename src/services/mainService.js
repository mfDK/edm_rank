angular.module('spotifyService', [])
    .factory('Artist', function($http) {
        var artistFactory = {};

        artistFactory.searchArtist = function(searchTerm) {
            return $http.get('https://api.spotify.com/v1/search?q=' + searchTerm + '&type=artist');
        }

        return artistFactory;
    })
