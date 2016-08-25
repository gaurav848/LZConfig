namespace lzconfig.services {

    export interface IApplicationResource
        extends ng.resource.IResource<lzconfig.IApplication> {
        //create(data: any): lzconfig.domain.IApplication;
    }

    export interface IApplicationVariableResource
        extends ng.resource.IResource<lzconfig.IApplicationVariable> {
    }

    export interface IApplicationConnectionResource
        extends ng.resource.IResource<lzconfig.IApplicationConnection> {
    }

    export interface IConnectionTypeResource
        extends ng.resource.IResource<lzconfig.IConnectionType> {
    }

    export interface ICustomApplicationResource extends ng.resource.IResourceClass<IApplicationResource> {
    }

    export interface IDataAccessService {
            
        getApplicationResource(): ng.resource.IResourceClass<IApplicationResource>;
        getApplicationVariableResource(): ng.resource.IResourceClass<IApplicationVariableResource>;
        getApplicationConnectionResource(): ng.resource.IResourceClass<IApplicationConnectionResource>;
        getConnectionTypeResource(): ng.resource.IResourceClass<IConnectionTypeResource>;
        performUpdate: boolean;
    }

    export class DataAccessService
        implements IDataAccessService {

        public performUpdate: boolean;   

        BASEURL = "http://" + this.$location.host() + "/LZConfig.Services/odata/";

        static $inject = ["$resource", "$location"];
        constructor(private $resource: ng.resource.IResourceService,
            private $location: ng.ILocationService) {
            this.performUpdate = true;
        }

        getApplicationResource(): ng.resource.IResourceClass<IApplicationResource> {
            const queryAction: ng.resource.IActionDescriptor = {
                method: 'GET',
                url: this.BASEURL + "Applications",
                isArray: false
            };
            //const getAction: ng.resource.IActionDescriptor = {
            //    method: 'GET',
            //    url: "http://localhost/LZConfig.Services/odata/Applications(:id)",
            //    params: { ID: "@ID" }
            //};
            const getAction: ng.resource.IActionDescriptor = {
                method: 'GET',
                url: this.BASEURL + "Applications(:id)",
                params: { $expand: "tblApplicationConnection,tblApplicationVariable"}
            };
            const createAction: ng.resource.IActionDescriptor = {
                method: 'POST',
                url: this.BASEURL + "Applications(:ID)",
                params: { ID: "@ID" },
                isArray: false
            };
            const updateAction: ng.resource.IActionDescriptor = {
                method: 'PUT',
                url: this.BASEURL + "Applications(:ID)",
                params: { ID: "@ID" }
            };
            const deleteAction: ng.resource.IActionDescriptor = {
                method: 'DELETE',
                url: this.BASEURL + "Applications(:ID)",
                params: { ID: "@ID" },
                isArray: false
            };

            var saveAction: ng.resource.IActionDescriptor;
            if (this.performUpdate)
                saveAction = updateAction;
            else
                saveAction = createAction;

            //angular.extend(this.$resource.prototype, 

            return this.$resource(this.BASEURL + "Applications(:id)", null, {
                query: queryAction,
                get: getAction,
                save: saveAction,
                delete: deleteAction,
                create: createAction
            });
        }

        getApplicationVariableResource(): ng.resource.IResourceClass<IApplicationVariableResource> {
            const createAction: ng.resource.IActionDescriptor = {
                method: 'POST',
                url: this.BASEURL + "ApplicationVariables",
                params: null,
                isArray: false
            };
            const updateAction: ng.resource.IActionDescriptor = {
                method: 'PUT',
                url: this.BASEURL + "ApplicationVariables(ApplicationID=:ID,Name='" + ":Name'" + ")",
                params: { ID: "@ApplicationID", Name: "@Name"  }
            };
            const deleteAction: ng.resource.IActionDescriptor = {
                method: 'DELETE',
                url: this.BASEURL + "ApplicationVariables(ApplicationID=:ApplicationID,Name='" + ":Name'" + ")",
                params: { ID: "@ApplicationID", Name: "@Name" },
                isArray: false
            };

            console.log("perform update:" + this.performUpdate);
            var saveAction: ng.resource.IActionDescriptor;
            if (this.performUpdate)
                saveAction = updateAction;
            else
                saveAction = createAction;
            
            //saveAction = createAction;
            //angular.extend(this.$resource.prototype, 

            return this.$resource(this.BASEURL + "ApplicationVariables(ApplicationID=:ID,Name='" + ":Name'" + ")", null, {
                save: saveAction,
                delete: deleteAction,
                create: createAction
            });
        }

        getApplicationConnectionResource(): ng.resource.IResourceClass<IApplicationConnectionResource> {
            const createAction: ng.resource.IActionDescriptor = {
                method: 'POST',
                url: this.BASEURL + "ApplicationConnections",
                params: null,
                isArray: false
            };
            const updateAction: ng.resource.IActionDescriptor = {
                method: 'PUT',
                url: this.BASEURL + "ApplicationConnections(ApplicationID=:ID,Name='" + ":Name'" + ")",
                params: { ID: "@ApplicationID", Name: "@Name" }
            };
            const deleteAction: ng.resource.IActionDescriptor = {
                method: 'DELETE',
                url: this.BASEURL + "ApplicationConnections(ApplicationID=:ApplicationID,Name='" + ":Name'" + ")",
                params: { ID: "@ApplicationID", Name: "@Name" },
                isArray: false
            };

            var saveAction: ng.resource.IActionDescriptor;
            if (this.performUpdate)
                saveAction = updateAction;
            else
                saveAction = createAction;
            
            console.log("performUpdate:" + this.performUpdate);
            return this.$resource(this.BASEURL + "ApplicationConnections(ApplicationID=:ID,Name='" + ":Name'" + ")", null, {
                save: saveAction,
                delete: deleteAction
            });

        }
        getConnectionTypeResource(): ng.resource.IResourceClass<IConnectionTypeResource> {
            const queryAction: ng.resource.IActionDescriptor = {
                method: 'GET',
                url: this.BASEURL + "ConnectionTypes",
                isArray: false
            };

            return this.$resource(this.BASEURL + "ConnectionTypes(:id)", null, {
                query: queryAction
            });
        }
    }

    angular
        .module(lzconfig.services.moduleName)
        .service("dataAccessService", DataAccessService);
}
