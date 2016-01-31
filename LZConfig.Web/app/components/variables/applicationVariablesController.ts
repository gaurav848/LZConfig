namespace lzconfig {
    class ApplicationVariablesController {
   

        static $inject = ["$scope"];
        constructor(private $scope: ng.IScope) {
            this.$scope = this.$scope.$parent;
        }
    }
angular
    .module("LZConfig")
    .controller("ApplicationVariablesController",
    ApplicationVariablesController);
}