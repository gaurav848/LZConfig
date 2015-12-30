namespace lzconfig.ApplicationDetail {

    interface IApplicationDetailModel {
        title: string;
        application: lzconfig.domain.IApplication;
        cancel(): void;
        save(): void;
        delete():void;
    }

    interface IApplicationParams extends ng.route.IRouteParamsService {
        id: string;
    }

    class ApplicationDetailCtrl implements IApplicationDetailModel {
        title: string;
        application: lzconfig.domain.IApplication;

        cancel() {
            this.$location.path("/applicationList");
        }

        save() {
            var applicationResource = this.dataAccessService.getApplicationResource();
           
            applicationResource.save(this.application)
                .$promise
                .then((data: any) => { console.log(data) })
                .catch((response) => { console.log(response) });
        }

        delete() {
            var applicationResource = this.dataAccessService.getApplicationResource();

            applicationResource.delete(this.application)
                .$promise
                .then((data: any) => { console.log(data) })
                .catch((response) => { console.log(response) });
        }

        static $inject = ["$routeParams", "dataAccessService", "$location", "$filter"];
        constructor(private $routeParams: IApplicationParams,
            private dataAccessService: lzconfig.services.DataAccessService,
            private $location: ng.ILocationService,
            private $filter: ng.IFilterService) {
            this.title = "Application Detail";
            var applicationResource = dataAccessService.getApplicationResource();

            applicationResource.get({ id: $routeParams.id },
                (data: lzconfig.domain.IApplication) => {
                    this.application = data;
                }
            );

            //$filter("uppercase")(this.application.name);

        }
    }

    angular
        .module("LZConfig")
        .controller("ApplicationDetailCtrl",
        ApplicationDetailCtrl);
}