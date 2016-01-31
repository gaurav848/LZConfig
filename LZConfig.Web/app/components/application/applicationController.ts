﻿namespace lzconfig {

    interface IApplicationParams extends ng.route.IRouteParamsService {
        ID: string;
    }

    class ApplicationController {
        title: string;

        tabs: any[];
        currentTab: string;

        application: lzconfig.domain.IApplication;

        variableType:string;

        selectedVariable:lzconfig.domain.IApplicationVariable;

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

            if (variable.Name === this.selectedVariable.Name) return 'edit';
            else return 'display';
        }

        editVariable = function (variable) {
            this.selected = angular.copy(variable);
        };

        deleteVariable = function (index: number) {
            var variable = this.application.tblApplicationVariable[index];
            console.log("deleteVariable:" + JSON.stringify(variable));
            var applicationVariableResource = this.dataAccessService.getApplicationVariableResource();
            //this.dataAccessService.performUpdate = true;
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
            var variable:lzconfig.domain.ApplicationVariable = new lzconfig.domain.ApplicationVariable(this.application.ID, null, null, null, user, new Date(), user, new Date());
            console.log("newVariable:" + JSON.stringify(variable));
            this.application.tblApplicationVariable.push(variable);
            this.selectedVariable = variable;
        }

        cancelEditVariable = function (index: number) {
            this.application.tblApplicationVariable.splice(index, 1);
            this.selected = null;
        }

        saveVariable(variable: lzconfig.domain.IApplicationVariable) {
            console.log("saveVariable:" + JSON.stringify(variable));

            var applicationVariableResource = this.dataAccessService.getApplicationVariableResource();
            this.dataAccessService.performUpdate = false;
            applicationVariableResource.save(variable)
                .$promise
                .then((data: any) => { console.log(data) })
                .catch((response) => { console.log(response) });

        }

        editConnection(connection: lzconfig.domain.IApplicationConnection) {

            if (connection == null)
                connection = new lzconfig.domain.ApplicationConnection(this.application.ID, null, null, null, null, null, null, "user", new Date(), "user", new Date());
            var modalInstance = this.$uibModal.open({
                animation: true,
                templateUrl: 'app/components/connections/applicationConnectionView.html',
                controller: 'ApplicationConnectionController',
                controllerAs:'vm',
                size: null,
                resolve: {connection: connection}
            });

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