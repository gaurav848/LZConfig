namespace lzconfig.services {

    const BASEURL = "http://localhost/LZConfig.Services/odata/";

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

        public performUpdate: boolean;

      

        static $inject = ["$resource"];
        constructor(private $resource: ng.resource.IResourceService) {
            this.performUpdate = true;
        }

        getApplicationResource(): ng.resource.IResourceClass<IApplicationResource> {
            const queryAction: ng.resource.IActionDescriptor = {
                method: 'GET',
                url: BASEURL + "Applications",
                isArray: false
            };
            //const getAction: ng.resource.IActionDescriptor = {
            //    method: 'GET',
            //    url: "http://localhost/LZConfig.Services/odata/Applications(:id)",
            //    params: { ID: "@ID" }
            //};
            const getAction: ng.resource.IActionDescriptor = {
                method: 'GET',
                url: BASEURL + "Applications(:id)",
                params: { $expand: "tblApplicationConnection,tblApplicationVariable"}
            };
            const createAction: ng.resource.IActionDescriptor = {
                method: 'POST',
                url: BASEURL + "Applications(:ID)",
                params: { ID: "@ApplicationID" },
                isArray: false
            };
            const updateAction: ng.resource.IActionDescriptor = {
                method: 'PUT',
                url: BASEURL + "Applications(:ID)",
                params: { ID: "@ApplicationID" }
            };
            const deleteAction: ng.resource.IActionDescriptor = {
                method: 'DELETE',
                url: BASEURL + "Applications(:ID)",
                params: { ID: "@ApplicationID" },
                isArray: false
            };

            var saveAction: ng.resource.IActionDescriptor;
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
        }

        getApplicationVariableResource(): ng.resource.IResourceClass<IApplicationVariableResource> {
            const createAction: ng.resource.IActionDescriptor = {
                method: 'POST',
                url: BASEURL + "ApplicationVariables",
                params: null,
                isArray: false
            };
            const updateAction: ng.resource.IActionDescriptor = {
                method: 'PUT',
                url: BASEURL + "ApplicationVariables(ApplicationID=:ID,Name='" + ":Name'" + ")",
                params: { ID: "@ApplicationID", Name: "@Name"  }
            };
            const deleteAction: ng.resource.IActionDescriptor = {
                method: 'DELETE',
                url: BASEURL + "ApplicationVariables(ApplicationID=:ApplicationID,Name='" + ":Name'" + ")",
                params: { ID: "@ApplicationID", Name: "@Name" },
                isArray: false
            };

            console.log("perform update:" + this.performUpdate);
            var saveAction: ng.resource.IActionDescriptor;
            if (this.performUpdate)
                saveAction = updateAction;
            else
                saveAction = createAction;
            
            saveAction = createAction;
            //angular.extend(this.$resource.prototype, 

            return this.$resource(BASEURL + "ApplicationVariables(ApplicationID=:ID,Name='" + ":Name'" + ")", null, {
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
