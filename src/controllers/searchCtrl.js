(function() {
    'use strict';

    angular
        .module('searchCtrl', ['youTubeService', 'ngSanitize'])
        .controller('SearchController', SearchController);

    function SearchController(YouTube, $sce) {
        var vm = this;
        var defaultUrl = 'https://www.youtube.com/embed/o5PeHK7tzaI';
        var embedUrl = 'https://www.youtube.com/embed/';
        vm.videoSearch = videoSearch;
        vm.activeVideo = activeVideo;
        vm.active = 0;
        vm.formData = {};

        launch();

        function launch() {
            videoSearch('Jauz');
        }

        function videoSearch(input) {
            YouTube.search(input)
                .then(function(response) {
                    vm.results = response;
                    vm.formData.input = "";
                    vm.embed = $sce.trustAsResourceUrl(embedUrl + response[0].id.videoId);
                    return vm.results;
                });
        }

        function activeVideo(element, info) {
            vm.active = element;
            vm.embed = $sce.trustAsResourceUrl(embedUrl + info.result.id.videoId);
            return vm.embed;
        }

    }
})();
