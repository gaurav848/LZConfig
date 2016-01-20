namespace lzconfig {

    interface IApplicationParams extends ng.route.IRouteParamsService {
        id: string;
    }

    class ApplicationController {
        title: string;

        tabs: any[];
        currentTab: string;

        application: lzconfig.domain.IApplication;

        onClickTab(tab) {
            this.currentTab = tab.url;
        }

        isActiveTab(tabUrl: string) {
            return tabUrl === this.currentTab;
        }

        static $inject = ["$routeParams", "dataAccessService", "$location", "$filter"];
        constructor(private $routeParams: IApplicationParams,
            private dataAccessService: lzconfig.services.DataAccessService,
            private $location: ng.ILocationService) {

            this.currentTab = "app/applications/applicationDetailView.html";
            this.title = "Application"
            this.tabs = [{ title: "Application", url: "app/applications/applicationDetailView.html" }, { title: "Connection Strings", url: "app/applications/applicationConnectionsView.html" }, { title: "Application Variables", url: "app/applications/applicationVariablesView.html" }];
            this.currentTab = "applicationDetailView.html";

            var applicationResource = dataAccessService.getApplicationResource();

            applicationResource.get({ id: $routeParams.id },
                (data: lzconfig.domain.IApplication) => {
                    this.application = data;
                }
            );
        }

    }
    angular
        .module("LZConfig")
        .controller("ApplicationController",
        ApplicationController);

}