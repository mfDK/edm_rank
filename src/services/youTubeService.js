(function() {
    'use strict'

    angular.module('youTubeService', ['ngResource'])
        .factory('YouTube', function($http, $filter) {
            var url = 'https://www.googleapis.com/youtube/v3/search';
            var api_key = 'AIzaSyAoMyGS80NBIVoOaHerSXOrXC65OEYz0AA';

            var ytFactory = {};

            ytFactory.search = function(searchInput) {
                return $http({
                    method: 'GET',
                    url: url,
                    params: {
                        'maxResults': '10',
                        'part': 'snippet',
                        'q': searchInput,
                        'type': 'video',
                        'key': api_key
                    }
                })
                .then(function(response) {
                    return response.data.items;
                })
            }

            return ytFactory;
        })
})();
