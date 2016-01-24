namespace lzconfig.services {

    export interface IApplicationResource
        extends ng.resource.IResource<lzconfig.domain.IApplication> {
        //create(data: any): lzconfig.domain.IApplication;
    }

    export interface IApplicationVariableResource
        extends ng.resource.IResource<lzconfig.domain.IApplicationVariable> {
        //create(data: any): lzconfig.domain.IApplication;
    }

    export interface ICustomApplicationResource extends ng.resource.IResourceClass<IApplicationResource> {
    }

    export interface IDataAccessService {
            
        getApplicationResource(): ng.resource.IResourceClass<IApplicationResource>;
        getApplicationVariableResource(): ng.resource.IResourceClass<IApplicationVariableResource>;
        performUpdate: boolean;
    }

    export class DataAccessService
        implements IDataAccessService {

        performUpdate: boolean;

        static $inject = ["$resource"];
        constructor(private $resource: ng.resource.IResourceService) {
        }

        getApplicationResource(): ng.resource.IResourceClass<IApplicationResource> {
            const queryAction: ng.resource.IActionDescriptor = {
                method: 'GET',
                url: "http://localhost/LZConfig.Services/Applications",
                isArray: false
            };
            //const getAction: ng.resource.IActionDescriptor = {
            //    method: 'GET',
            //    url: "http://localhost/LZConfig.Services/Applications(:id)",
            //    params: { ID: "@ID" }
            //};
            const getAction: ng.resource.IActionDescriptor = {
                method: 'GET',
                url: "http://localhost/LZConfig.Services/Applications(:id)",
                params: { $expand: "tblApplicationConnection,tblApplicationVariable"}
            };
            const createAction: ng.resource.IActionDescriptor = {
                method: 'POST',
                url: "http://localhost/LZConfig.Services/Applications(:ID)",
                params: { ID: "@ID" },
                isArray: false
            };
            const updateAction: ng.resource.IActionDescriptor = {
                method: 'PUT',
                url: "http://localhost/LZConfig.Services/Applications(:ID)",
                params: { ID: "@ID" }
            };
            const deleteAction: ng.resource.IActionDescriptor = {
                method: 'DELETE',
                url: "http://localhost/LZConfig.Services/Applications(:ID)",
                params: { ID: "@ID" },
                isArray: false
            };

            var saveAction: ng.resource.IActionDescriptor;
            if (this.performUpdate)
                saveAction = updateAction;
            else
                saveAction = createAction;

            //angular.extend(this.$resource.prototype, 

            return this.$resource("http://localhost/LZConfig.Services/Applications(:id)", null, {
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
                url: "http://localhost/LZConfig.Services/ApplicationVariables(ApplicationID=:ID,Name='" + ":Name'" + ")",
                params: { ID: "@ApplicationID", Name:"@Name" },
                isArray: false
            };
            const updateAction: ng.resource.IActionDescriptor = {
                method: 'PUT',
                url: "http://localhost/LZConfig.Services/ApplicationVariables(ApplicationID=:ID,Name='" + ":Name'" + ")",
                params: { ID: "@ApplicationID", Name: "@Name"  }
            };
            const deleteAction: ng.resource.IActionDescriptor = {
                method: 'DELETE',
                url: "http://localhost/LZConfig.Services/ApplicationVariables(:ID,:Name)",
                params: { ID: "@ID", Name: "@Name"  },
                isArray: false
            };

            var saveAction: ng.resource.IActionDescriptor;
            if (this.performUpdate)
                saveAction = updateAction;
            else
                saveAction = createAction;
            
            saveAction = updateAction;
            //angular.extend(this.$resource.prototype, 

            return this.$resource("http://localhost/LZConfig.Services/ApplicationVariables(:id)", null, {
                save: saveAction,
                delete: deleteAction,
                create: createAction
            });
        }
    }

    angular
        .module(lzconfig.services.moduleName)
        .service("dataAccessService", DataAccessService);
}
