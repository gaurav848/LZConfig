module app.ApplicationList {
    interface IApplicationListModel {
        title: string;
        applications: app.domain.IApplication[];
    }

    class ApplicationListCtrl implements IApplicationListModel {
        title: string;    

        applications: app.domain.IApplication[];

        static $inject = ["dataAccessService"];
        constructor(private dataAccessService: app.common.DataAccessService) {
            this.title = "Application List";
            this.applications = [];

            var applicationResource = dataAccessService.getApplicationResource();

            var config = {
                url: "http://localhost:3523/Applications",
                method: "GET",
                isArray: false,
                transformResponse: function(data, headers) {
                    return angular.fromJson(data).value;
                }
            };

            //applicationResource.get(config, (data: app.domain.IApplication[]) => {
            //    this.applications = data;
            //});
            applicationResource.get()
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