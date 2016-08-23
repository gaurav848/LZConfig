var lzconfig;
(function (lzconfig) {
    var ApplicationVariablesController = (function () {
        function ApplicationVariablesController($scope) {
            this.$scope = $scope;
            this.$scope = this.$scope.$parent;
        }
        ApplicationVariablesController.$inject = ["$scope"];
        return ApplicationVariablesController;
    }());
    angular
        .module("LZConfig")
        .controller("ApplicationVariablesController", ApplicationVariablesController);
})(lzconfig || (lzconfig = {}));
//# sourceMappingURL=applicationVariablesController.js.map