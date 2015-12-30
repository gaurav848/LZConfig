namespace app.ApplicationList {
    interface IApplicationListModel {
        title: string;
        applications: lzconfig.domain.IApplication[];
    }

    class ApplicationListCtrl implements IApplicationListModel {
        title: string;    

        applications: lzconfig.domain.IApplication[];

        static $inject = ["dataAccessService"];
        constructor(private dataAccessService: lzconfig.services.DataAccessService) {
            this.title = "Application List";
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
        .controller("ApplicationListCtrl",
            ApplicationListCtrl);
}