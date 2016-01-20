namespace lzconfig {

    interface IApplicationParams extends ng.route.IRouteParamsService {
        id: string;
    }

    class ApplicationController {
        title: string;

        tabs: any[];
        currentTab: string;

        application: lzconfig.domain.IApplication;

        selected:lzconfig.domain.IApplicationVariable;

        onClickTab(tab) {
            this.currentTab = tab.url;
        }

        setActiveTab(tabUrl: string) {
            this.currentTab = tabUrl;
            console.log("setActiveTab:" + tabUrl);
        }

        isActiveTab(tabUrl: string) {
            return tabUrl === this.currentTab;
        }

        getTemplate(variable): string {
            console.log("variable:" + JSON.stringify(variable));
            if (!this.selected)
                return 'display';

            if (variable.Name === this.selected.Name) return 'edit';
            else return 'display';
        }

        editVariable = function (variable) {
            this.selected = angular.copy(variable);
        };

        cancelEditVariable = function() {
            this.selected = null;
        }

        static $inject = ["$routeParams", "dataAccessService", "$location", "$filter"];
        constructor(private $routeParams: IApplicationParams,
            private dataAccessService: lzconfig.services.DataAccessService,
            private $location: ng.ILocationService) {

            this.title = "Application"
            this.tabs = [{ title: "Application", url: "app/components/application/applicationDetailView.html" }, { title: "Connection Strings", url: "app/components/connections/applicationConnectionsView.html" }, { title: "Application Variables", url: "app/components/variables/applicationVariablesView.html" }];
            this.currentTab = "app/components/application/applicationDetailView.html";

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