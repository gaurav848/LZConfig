namespace lzconfig
{
    var main = angular.module("LZConfig",
        ["ngRoute", "common.services"]);

    main.config(($httpProvider) => {
        $httpProvider.defaults.withCredentials = true;
        }
    );

    main.config(routeConfig);

    routeConfig.$inject = ["$routeProvider"];
    function routeConfig($routeProvider: ng.route.IRouteProvider): void {

        $routeProvider
            .when("/applicationList",
            {
                templateUrl: "app/components/applications/applicationListView.html",
                controller: "ApplicationListController",
                controllerAs: "vm"
            })
            .when("/application/:id",
            {
                templateUrl: "app/components/application/applicationView.html",
                controller: "ApplicationController",
                controllerAs: "vm"
            })
            .otherwise("/applicationList");
    }
}