(function() {
    'use strict';

    angular
        .module('setSearch')
        .factory('YouTube', YouTube);

    YouTube.$inject = ['$http'];

    function YouTube($http) {
        var url = 'https://www.googleapis.com/youtube/v3/search';
        var api_key = 'AIzaSyAoMyGS80NBIVoOaHerSXOrXC65OEYz0AA';
        var service = {
            search: search
        };

        return service;

        function search(searchInput) {
            return $http({
                method: 'GET',
                url: url,
                params: {
                    'maxResults': '10',
                    'part': 'snippet',
                    'q': searchInput + ' live set',
                    'type': 'video',
                    'key': api_key
                }
            })
            .then(function(response) {
                return response.data.items;
            });
        }

    }

})();
