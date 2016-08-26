namespace lzconfig.services {

    export class ModalService {

        static $inject = ["$modal"];

        //constructor(private $modal: ng.res,
        //    private $location: ng.ILocationService) {}
    }

    angular
        .module(lzconfig.services.moduleName)
        .service("modalService", ModalService);
}