var lzconfig;
(function (lzconfig) {
    var services;
    (function (services) {
        var BASEURL = "http://localhost/LZConfig.Services/odata/";
        var DataAccessService = (function () {
            function DataAccessService($resource) {
                this.$resource = $resource;
                this.performUpdate = true;
            }
            DataAccessService.prototype.getApplicationResource = function () {
                var queryAction = {
                    method: 'GET',
                    url: BASEURL + "Applications",
                    isArray: false
                };
                //const getAction: ng.resource.IActionDescriptor = {
                //    method: 'GET',
                //    url: "http://localhost/LZConfig.Services/odata/Applications(:id)",
                //    params: { ID: "@ID" }
                //};
                var getAction = {
                    method: 'GET',
                    url: BASEURL + "Applications(:id)",
                    params: { $expand: "tblApplicationConnection,tblApplicationVariable" }
                };
                var createAction = {
                    method: 'POST',
                    url: BASEURL + "Applications(:ID)",
                    params: { ID: "@ID" },
                    isArray: false
                };
                var updateAction = {
                    method: 'PUT',
                    url: BASEURL + "Applications(:ID)",
                    params: { ID: "@ID" }
                };
                var deleteAction = {
                    method: 'DELETE',
                    url: BASEURL + "Applications(:ID)",
                    params: { ID: "@ID" },
                    isArray: false
                };
                var saveAction;
                if (this.performUpdate)
                    saveAction = updateAction;
                else
                    saveAction = createAction;
                //angular.extend(this.$resource.prototype, 
                return this.$resource(BASEURL + "Applications(:id)", null, {
                    query: queryAction,
                    get: getAction,
                    save: saveAction,
                    delete: deleteAction,
                    create: createAction
                });
            };
            DataAccessService.prototype.getApplicationVariableResource = function () {
                var createAction = {
                    method: 'POST',
                    url: BASEURL + "ApplicationVariables",
                    params: null,
                    isArray: false
                };
                var updateAction = {
                    method: 'PUT',
                    url: BASEURL + "ApplicationVariables(ApplicationID=:ID,Name='" + ":Name'" + ")",
                    params: { ID: "@ApplicationID", Name: "@Name" }
                };
                var deleteAction = {
                    method: 'DELETE',
                    url: BASEURL + "ApplicationVariables(ApplicationID=:ApplicationID,Name='" + ":Name'" + ")",
                    params: { ID: "@ApplicationID", Name: "@Name" },
                    isArray: false
                };
                console.log("perform update:" + this.performUpdate);
                var saveAction;
                if (this.performUpdate)
                    saveAction = updateAction;
                else
                    saveAction = createAction;
                //saveAction = createAction;
                //angular.extend(this.$resource.prototype, 
                return this.$resource(BASEURL + "ApplicationVariables(ApplicationID=:ID,Name='" + ":Name'" + ")", null, {
                    save: saveAction,
                    delete: deleteAction,
                    create: createAction
                });
            };
            DataAccessService.prototype.getApplicationConnectionResource = function () {
                var createAction = {
                    method: 'POST',
                    url: BASEURL + "ApplicationConnections",
                    params: null,
                    isArray: false
                };
                var updateAction = {
                    method: 'PUT',
                    url: BASEURL + "ApplicationConnections(ApplicationID=:ID,Name='" + ":Name'" + ")",
                    params: { ID: "@ApplicationID", Name: "@Name" }
                };
                var deleteAction = {
                    method: 'DELETE',
                    url: BASEURL + "ApplicationConnections(ApplicationID=:ApplicationID,Name='" + ":Name'" + ")",
                    params: { ID: "@ApplicationID", Name: "@Name" },
                    isArray: false
                };
                var saveAction;
                if (this.performUpdate)
                    saveAction = updateAction;
                else
                    saveAction = createAction;
                console.log("performUpdate:" + this.performUpdate);
                return this.$resource(BASEURL + "ApplicationConnections(ApplicationID=:ID,Name='" + ":Name'" + ")", null, {
                    save: saveAction,
                    delete: deleteAction
                });
            };
            DataAccessService.prototype.getConnectionTypeResource = function () {
                var queryAction = {
                    method: 'GET',
                    url: BASEURL + "ConnectionTypes",
                    isArray: false
                };
                return this.$resource(BASEURL + "ConnectionTypes(:id)", null, {
                    query: queryAction
                });
            };
            DataAccessService.$inject = ["$resource"];
            return DataAccessService;
        }());
        services.DataAccessService = DataAccessService;
        angular
            .module(lzconfig.services.moduleName)
            .service("dataAccessService", DataAccessService);
    })(services = lzconfig.services || (lzconfig.services = {}));
})(lzconfig || (lzconfig = {}));
