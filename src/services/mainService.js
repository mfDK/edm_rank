angular.module('spotifyService', [])
    .factory('Spotify', function($http, $filter) {
        var artistFactory = {};

        artistFactory.searchArtist = function(searchTerm) {
            return $http.get('https://api.spotify.com/v1/search?q=' + searchTerm + '&type=artist')
                        .then(function(response) {
                            return response.data;
                        });
        }

        artistFactory.relatedArtists = function(artistId) {
            return $http.get('https://api.spotify.com/v1/artists/' + artistId + '/related-artists')
                        .then(function(response) {
                            return response.data.artists;
                        });
        }

        artistFactory.getTopTracks = function(artistId) {
            return $http.get('https://api.spotify.com/v1/artists/' + artistId + '/top-tracks?country=US')
                        .then(function(response) {
                            return response.data.tracks;
                        });
        }

        return artistFactory;
    })