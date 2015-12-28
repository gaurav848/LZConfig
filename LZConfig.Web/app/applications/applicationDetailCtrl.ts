namespace app.ApplicationDetail {
    
    interface IApplicationDetailModel {
        title: string;
        application: app.domain.IApplication;
    }

    interface IApplicationParams extends ng.route.IRouteParamsService {
        id : string;
    }

    class ApplicationDetailCtrl implements IApplicationDetailModel {
        title: string;
        application: app.domain.IApplication;

        static $inject = ["$routeParams", "dataAccessService"];
        constructor(private $routeParams: IApplicationParams,
            private dataAccessService: app.services.DataAccessService) {
            this.title = "Application Detail";

            var applicationResource = dataAccessService.getApplicationResource();

            applicationResource.get({ id: $routeParams.id },
                (data: app.domain.IApplication) => {
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