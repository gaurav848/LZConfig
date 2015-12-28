module app
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
                templateUrl: "app/applications/applicationListView.html",
                controller: "ApplicationListCtrl",
                controllerAs: "vm"
            })
            .when("/applicationDetail/:id",
            {
                templateUrl: "app/applications/applicationDetailView.html",
                controller: "ApplicationDetailCtrl",
                controllerAs: "vm"
            })
            .otherwise("/applicationList");
    }
}