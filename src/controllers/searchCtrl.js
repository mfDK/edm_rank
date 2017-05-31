(function() {
    'use strict'

    angular
        .module('searchCtrl', ['youTubeService', 'ngSanitize'])
        .controller('SearchController', SearchController);

    function SearchController(YouTube, $sce) {
        var vm = this;
        var embedUrl = 'https://www.youtube.com/embed/';
        var defaultUrl = 'https://www.youtube.com/embed/o5PeHK7tzaI'
        vm.videoSearch = videoSearch;
        vm.embedFirst = embedFirst;
        vm.formData = {};

        launch();

        function launch() {
            videoSearch('Jauz');
        }

        function embedFirst(object) {
            var firstVideoId = object[0].id.videoId;
            return vm.embed = $sce.trustAsResourceUrl(embedUrl + firstVideoId);
        }

        function videoSearch(input) {
            YouTube.search(input)
                .then(function(response) {
                    vm.results = response;
                    vm.embedFirst(response);
                    vm.formData.input = "";
                    return vm.results;
                })
        }

    }
})();
