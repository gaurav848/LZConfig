namespace lzconfig.ApplicationDetail {
    
    interface IApplicationDetailModel {
        title: string;
        application: lzconfig.domain.IApplication;
        cancel(): void;
    }

    interface IApplicationParams extends ng.route.IRouteParamsService {
        id : string;
    }

    class ApplicationDetailCtrl implements IApplicationDetailModel {
        title: string;
        application: lzconfig.domain.IApplication;

        cancel() {
            this.$location.path("/applicationList");
        }

        static $inject = ["$routeParams", "dataAccessService", "$location"];
        constructor(private $routeParams: IApplicationParams,
            private dataAccessService: lzconfig.services.DataAccessService,
            private $location: ng.ILocationService) {
            this.title = "Application Detail";

            var applicationResource = dataAccessService.getApplicationResource();

            applicationResource.get({ id: $routeParams.id },
                (data: lzconfig.domain.IApplication) => {
                    this.application = data;
                }
            );
        }
    }

    angular
        .module("LZConfig")
        .controller("ApplicationDetailCtrl",
        ApplicationDetailCtrl);
}