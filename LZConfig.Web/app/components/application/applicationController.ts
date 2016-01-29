namespace lzconfig {

    export interface IApplicationVariable {
        ApplicationID: string;
        Name: string;
        Value: string;
        Secure: boolean;
        CreatedBy: string;
        CreatedDate: Date;
        ModifiedBy: string;
        ModifiedDate: Date;
    }

    export class ApplicationVariable implements IApplicationVariable {
        constructor(public ApplicationID: string,
            public Name: string,
            public Value: string,
            public Secure: boolean,
            public CreatedBy: string,
            public CreatedDate: Date,
            public ModifiedBy: string,
            public ModifiedDate: Date) {
        }
    }

    interface IApplicationParams extends ng.route.IRouteParamsService {
        ID: string;
    }

    class ApplicationController {
        title: string;

        tabs: any[];
        currentTab: string;

        application: lzconfig.domain.IApplication;

        selected:IApplicationVariable;

        onClickTab(tab) {
            this.currentTab = tab.url;
        }

        setActiveTab(tabUrl: string) {
      //      console.log("setActiveTab:" + tabUrl);
            this.currentTab = tabUrl;
        }

        isActiveTab(tabUrl: string) {
            return tabUrl === this.currentTab;
        }

        getTemplate(variable): string {
           // console.log("variable:" + JSON.stringify(variable));
            if (!this.selected)
                return 'display';

            if (variable.Name === this.selected.Name) return 'edit';
            else return 'display';
        }

        editVariable = function (variable) {
            this.selected = angular.copy(variable);
        };

        deleteVariable = function (variable: IApplicationVariable) {
            console.log("deleteVariable:" + JSON.stringify(variable));
            var applicationVariableResource = this.dataAccessService.getApplicationVariableResource();
            //this.dataAccessService.performUpdate = true;
            applicationVariableResource.delete(variable)
                .$promise
                .then((data: any) => { console.log(data) })
                .catch((response) => { console.log(response) });
        };

        newVariable = function() {
            console.log("newVariable called");
            var variable:ApplicationVariable = new ApplicationVariable(this.application.ID, null, null, null, "user", new Date(), "user", new Date());
            console.log("newVariable:" + JSON.stringify(variable));
            this.application.tblApplicationVariable.push(variable);
            this.selected = variable;
        }
        cancelEditVariable = function() {
            this.selected = null;
        }

        saveVariable(variable: IApplicationVariable) {
            console.log("saveVariable:" + JSON.stringify(variable));

            var applicationVariableResource = this.dataAccessService.getApplicationVariableResource();
            this.dataAccessService.performUpdate = false;
            applicationVariableResource.save(variable)
                .$promise
                .then((data: any) => { console.log(data) })
                .catch((response) => { console.log(response) });

        }

        static $inject = ["$routeParams", "dataAccessService", "$location", "$filter"];
        constructor(private $routeParams: IApplicationParams,
            private dataAccessService: lzconfig.services.DataAccessService,
            private $location: ng.ILocationService) {

            this.title = "Application"
            this.tabs = [
                { title: "Application", url: "app/components/application/applicationDetailView.html" },
                { title: "Connection Strings", url: "app/components/connections/applicationConnectionsView.html" },
                { title: "Application Variables", url: "app/components/variables/applicationVariablesView.html" }
            ];
            this.currentTab = "app/components/application/applicationDetailView.html";

            var applicationResource = dataAccessService.getApplicationResource();

            applicationResource.get({ id: $routeParams.ID },
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