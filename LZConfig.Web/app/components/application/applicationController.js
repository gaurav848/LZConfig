var lzconfig;
(function (lzconfig) {
    var ApplicationController = (function () {
        function ApplicationController($routeParams, dataAccessService, $location, $uibModal, $rootScope) {
            this.$routeParams = $routeParams;
            this.dataAccessService = dataAccessService;
            this.$location = $location;
            this.$uibModal = $uibModal;
            this.$rootScope = $rootScope;
            this.editVariable = function (variable) {
                console.log("editVariable:" + JSON.stringify(variable));
                this.selectedVariable = angular.copy(variable);
            };
            this.deleteVariable = function (index) {
                var _this = this;
                if (!confirm("Are you sure you want to delte the variable?"))
                    return;
                var variable = this.application.tblApplicationVariable[index];
                console.log("deleteVariable:" + JSON.stringify(variable));
                var applicationVariableResource = this.dataAccessService.getApplicationVariableResource();
                applicationVariableResource.delete(variable)
                    .$promise
                    .then(function (data) {
                    console.log(data);
                    _this.application.tblApplicationVariable.splice(index, 1);
                })
                    .catch(function (response) { console.log(response); });
            };
            this.newVariable = function (inputType) {
                console.log("newVariable called");
                this.variableType = inputType;
                var user = "user";
                var variable = new lzconfig.ApplicationVariable(this.application.ID, null, null, inputType === "password", user, null, user, null);
                console.log("newVariable:" + JSON.stringify(variable));
                this.application.tblApplicationVariable.push(variable);
                this.selectedVariable = variable;
            };
            this.cancelEditVariable = function (index) {
                this.application.tblApplicationVariable.splice(index, 1);
                this.selected = null;
            };
            this.title = "Application";
            this.tabs = [
                { title: "Application", url: "app/components/application/applicationDetailView.html" },
                { title: "Connection Strings", url: "app/components/connections/applicationConnectionsView.html" },
                { title: "Application Variables", url: "app/components/variables/applicationVariablesView.html" }
            ];
            this.currentTab = "app/components/application/applicationDetailView.html";
            this.getApplication();
        }
        ApplicationController.prototype.onClickTab = function (tab) {
            this.currentTab = tab.url;
        };
        ApplicationController.prototype.setActiveTab = function (tabUrl) {
            //      console.log("setActiveTab:" + tabUrl);
            this.currentTab = tabUrl;
        };
        ApplicationController.prototype.isActiveTab = function (tabUrl) {
            return tabUrl === this.currentTab;
        };
        ApplicationController.prototype.getTemplate = function (variable) {
            // console.log("variable:" + JSON.stringify(variable));
            if (!this.selectedVariable)
                return 'display';
            if (variable.Name === this.selectedVariable.Name)
                return 'edit';
            else
                return 'display';
        };
        ApplicationController.prototype.saveApplication = function () {
            console.log("saveApplication:" + JSON.stringify(this.application));
            var applicationResource = this.dataAccessService.getApplicationResource();
            var applicationToSave = new lzconfig.ApplicationVM(this.application.ID, this.application.Name, this.application.Description, this.application.URL, this.application.CreatedBy, this.application.CreatedDate, "user", new Date());
            applicationResource.save(applicationToSave);
            this.getApplication();
        };
        ApplicationController.prototype.deleteApplication = function () {
            if (!confirm("Are you sure you want to delete the appliction?"))
                return;
            console.log("deleteApplication:" + JSON.stringify(this.application));
            var applicationResource = this.dataAccessService.getApplicationResource();
            applicationResource.delete({ ID: this.application.ID });
        };
        ApplicationController.prototype.cancelApplication = function () {
            this.$location.path("/applicationList");
        };
        ApplicationController.prototype.saveVariable = function (variable) {
            var _this = this;
            console.log("saveVariable:" + JSON.stringify(variable));
            this.dataAccessService.performUpdate = !(variable.CreatedDate == null);
            var applicationVariableResource = this.dataAccessService.getApplicationVariableResource();
            if (variable.CreatedDate == null)
                variable.CreatedDate = new Date();
            if (variable.ModifiedDate == null)
                variable.ModifiedDate = new Date();
            applicationVariableResource.save(variable)
                .$promise
                .then(function (data) {
                console.log(data);
                _this.getApplication();
            })
                .catch(function (response) { console.log(response); });
        };
        ApplicationController.prototype.editConnection = function (connection) {
            var _this = this;
            if (connection == null)
                connection = new lzconfig.ApplicationConnection(this.application.ID, null, null, null, null, null, null, "user", null, "user", null);
            var modalInstance = this.$uibModal.open({
                animation: true,
                templateUrl: 'app/components/connections/applicationConnectionView.html',
                controller: 'ApplicationConnectionController',
                controllerAs: 'vm',
                size: null,
                resolve: { connection: connection }
            }).result.then(function () { _this.getApplication(); });
        };
        ApplicationController.prototype.deleteConnection = function (index) {
            var _this = this;
            if (!confirm("Are you sure you want to delte the connection?"))
                return;
            var connection = this.application.tblApplicationConnection[index];
            console.log("deleteConnection" + JSON.stringify(connection));
            var applicationConnectionResource = this.dataAccessService.getApplicationConnectionResource();
            //this.dataAccessService.performUpdate = true;
            applicationConnectionResource.delete(connection)
                .$promise
                .then(function (data) {
                console.log(data);
                _this.application.tblApplicationConnection.splice(index, 1);
            })
                .catch(function (response) { console.log(response); });
        };
        ;
        ApplicationController.prototype.getApplication = function () {
            var _this = this;
            this.selectedVariable = null;
            var applicationResource = this.dataAccessService.getApplicationResource();
            applicationResource.get({ id: this.$routeParams.ID }, function (data) {
                _this.application = data;
            });
        };
        ApplicationController.$inject = ["$routeParams", "dataAccessService", "$location", "$uibModal", "$rootScope"];
        return ApplicationController;
    }());
    angular
        .module("LZConfig")
        .controller("ApplicationController", ApplicationController);
})(lzconfig || (lzconfig = {}));
