namespace lzconfig {

    interface IApplicationParams extends ng.route.IRouteParamsService {
        ID: string;
    }

    class ApplicationController {
        
        title: string;

        tabs: any[];
        currentTab: string;

        application: lzconfig.IApplication;

        variableType:string;

        selectedVariable: lzconfig.IApplicationVariable;

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
            if (!this.selectedVariable)
                return 'display';

             if (variable.Name === this.selectedVariable.Name)
                return 'edit';
            else
                return 'display';
        }

        saveApplication() {
            console.log("saveApplication:" + JSON.stringify(this.application));
            var applicationResource = this.dataAccessService.getApplicationResource();
            var applicationToSave: lzconfig.ApplicationVM = new lzconfig.ApplicationVM(this.application.ID, this.application.Name, this.application.Description, this.application.URL, this.application.CreatedBy, this.application.CreatedDate, "user", new Date());
            applicationResource.save(applicationToSave);
            this.getApplication();
        }

        deleteApplication() {
            if (!confirm("Are you sure you want to delete the appliction?"))
                return;
            console.log("deleteApplication:" + JSON.stringify(this.application));
            var applicationResource = this.dataAccessService.getApplicationResource();
            applicationResource.delete({ID: this.application.ID});
        }

        cancelApplication() {
            this.$location.path("/applicationList");
        }

        editVariable = function (variable) {
            console.log("editVariable:" + JSON.stringify(variable));
            this.selectedVariable = angular.copy(variable);
        };

        deleteVariable = function (index: number) {
            if (!confirm("Are you sure you want to delte the variable?"))
                return;

            var variable = this.application.tblApplicationVariable[index];
            console.log("deleteVariable:" + JSON.stringify(variable));
            var applicationVariableResource = this.dataAccessService.getApplicationVariableResource();
            applicationVariableResource.delete(variable)
                .$promise
                .then((data: any) => { console.log(data);
                    this.application.tblApplicationVariable.splice(index,1);
                })
                .catch((response) => { console.log(response) });
        };

        newVariable = function(inputType:string) {
            console.log("newVariable called");
            this.variableType = inputType;
            var user = "user";
            var variable: lzconfig.ApplicationVariable = new lzconfig.ApplicationVariable(this.application.ID, null, null, inputType === "password", user,  null, user, null);
            console.log("newVariable:" + JSON.stringify(variable));
            this.application.tblApplicationVariable.push(variable);
            this.selectedVariable = variable;
        }

        cancelEditVariable = function (index: number) {
            this.application.tblApplicationVariable.splice(index, 1);
            this.selected = null;
        }

        saveVariable(variable: lzconfig.ApplicationVariable) {
            console.log("saveVariable:" + JSON.stringify(variable));
            this.dataAccessService.performUpdate = !(variable.CreatedDate == null);
            var applicationVariableResource = this.dataAccessService.getApplicationVariableResource();
            if (variable.CreatedDate == null)
                variable.CreatedDate = new Date();
            if (variable.ModifiedDate == null)
                variable.ModifiedDate = new Date();
            applicationVariableResource.save(variable)
                .$promise
                .then((data: any) => {
                    console.log(data);
                    this.getApplication();
                })
                .catch((response) => { console.log(response) });
        }

        editConnection(connection: lzconfig.IApplicationConnection) {

            if (connection == null)
                connection = new lzconfig.ApplicationConnection(this.application.ID, null, null, null, null, null, null, "user", null, "user", null);
            var modalInstance = this.$uibModal.open({
                animation: true,
                templateUrl: 'app/components/connections/applicationConnectionView.html',
                controller: 'ApplicationConnectionController',
                controllerAs: 'vm',
                size: null,
                resolve: { connection: connection }
            }).result.then(() => { this.getApplication()});
        }

        deleteConnection(index: number) {
            if (!confirm("Are you sure you want to delte the connection?"))
                return;

            var connection = this.application.tblApplicationConnection[index];
            console.log("deleteConnection" + JSON.stringify(connection));
            var applicationConnectionResource = this.dataAccessService.getApplicationConnectionResource();
            //this.dataAccessService.performUpdate = true;
            applicationConnectionResource.delete(connection)
                .$promise
                .then((data: any) => {
                    console.log(data);
                    this.application.tblApplicationConnection.splice(index, 1);
                })
                .catch((response) => { console.log(response) });
        };

        private getApplication() {
            this.selectedVariable = null;
            var applicationResource = this.dataAccessService.getApplicationResource();
            applicationResource.get({ id: this.$routeParams.ID  },
                (data: lzconfig.IApplication) => {
                    this.application = data;
                }
            );
        }
        static $inject = ["$routeParams", "dataAccessService", "$location", "$uibModal", "$rootScope"];
        constructor(private $routeParams: IApplicationParams,
            private dataAccessService: lzconfig.services.DataAccessService,
            private $location: ng.ILocationService,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private $rootScope: ng.IRootScopeService) {

            this.title = "Application"
            this.tabs = [
                { title: "Application", url: "app/components/application/applicationDetailView.html" },
                { title: "Connection Strings", url: "app/components/connections/applicationConnectionsView.html" },
                { title: "Application Variables", url: "app/components/variables/applicationVariablesView.html" }
            ];
            this.currentTab = "app/components/application/applicationDetailView.html";
            this.getApplication();
        }

    }
    angular
        .module("LZConfig")
        .controller("ApplicationController",
        ApplicationController);

}