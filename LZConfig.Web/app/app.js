var lzconfig;
(function (lzconfig) {
    var main = angular.module("LZConfig", ["ngRoute", "ui.bootstrap", "common.services"]);
    main.config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    });
    main.config(routeConfig);
    routeConfig.$inject = ["$routeProvider"];
    function routeConfig($routeProvider) {
        $routeProvider
            .when("/applicationList", {
            templateUrl: "app/components/applications/applicationListView.html",
            controller: "ApplicationListController",
            controllerAs: "vm"
        })
            .when("/application/:ID", {
            templateUrl: "app/components/application/applicationView.html",
            controller: "ApplicationController",
            controllerAs: "vm"
        })
            .otherwise("/applicationList");
    }
})(lzconfig || (lzconfig = {}));
//# sourceMappingURL=app.js.map