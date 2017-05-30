(function() {
    'use strict'

    angular.module('searchCtrl', ['youTubeService'])
        .controller('SearchController', SearchController);

    function SearchController(YouTube) {
        var vm = this;

        vm.formData = {};

        vm.search = function(input) {
            YouTube.search(input)
                .then(function(response) {
                    console.log(response);
                    return response;
                })
        }
    }
})();
