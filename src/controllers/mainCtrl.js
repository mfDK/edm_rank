angular.module('newApp', ['ngResource'])
    .controller('mainController', function($scope, $http) {
        $scope.hello = "hello World";

        $scope.searchTerm = "";

        $scope.doSearch = function(searchTerm) {
            $http.get('https://api.spotify.com/v1/search?q=' + searchTerm + '&type=artist')
                .then(function(response) {
                    $scope.artist = response.data;
                    $scope.searchTerm = "";
                })
        };


    });
