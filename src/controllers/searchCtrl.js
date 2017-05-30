(function() {
    'use strict'

    angular
        .module('searchCtrl', ['youTubeService'])
        .controller('SearchController', SearchController);

    function SearchController(YouTube) {
        var vm = this;
        vm.videoSearch = videoSearch;
        vm.formData = {};

        function videoSearch(input) {
            YouTube.search(input)
                .then(function(response) {
                    vm.results = response;
                    vm.formData.input = "";
                    return vm.results;
                })
        }

    }
})();
