namespace lzconfig {
    export interface IApplicationListController {
        title: string;
        applications: lzconfig.domain.IApplication[];
    }

    export class ApplicationListController implements IApplicationListController {
        title: string;    

        applications: lzconfig.domain.IApplication[];

        static $inject = ["dataAccessService"];
        constructor(private dataAccessService: lzconfig.services.DataAccessService) {
            this.title = "Applications";
            this.applications = [];

            var applicationResource = dataAccessService.getApplicationResource();

            applicationResource.query()
                .$promise
                .then((data: any) => { this.applications = data.value})
                .catch((response) => {console.log(response)});
        }
    }

    angular
        .module("LZConfig")
        .controller("ApplicationListController",
            ApplicationListController);
}