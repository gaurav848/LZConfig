var lzconfig;
(function (lzconfig) {
    var ApplicationListController = (function () {
        function ApplicationListController(dataAccessService) {
            var _this = this;
            this.dataAccessService = dataAccessService;
            this.title = "Applications";
            this.applications = [];
            var applicationResource = dataAccessService.getApplicationResource();
            applicationResource.query()
                .$promise
                .then(function (data) { _this.applications = data.value; })
                .catch(function (response) { console.log(response); });
        }
        ApplicationListController.$inject = ["dataAccessService"];
        return ApplicationListController;
    }());
    lzconfig.ApplicationListController = ApplicationListController;
    angular
        .module("LZConfig")
        .controller("ApplicationListController", ApplicationListController);
})(lzconfig || (lzconfig = {}));
//# sourceMappingURL=applicationListController.js.map