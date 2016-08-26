var lzconfig;
(function (lzconfig) {
    var services;
    (function (services) {
        var ModalService = (function () {
            function ModalService() {
            }
            ModalService.$inject = ["$modal"];
            return ModalService;
        }());
        services.ModalService = ModalService;
        angular
            .module(lzconfig.services.moduleName)
            .service("modalService", ModalService);
    })(services = lzconfig.services || (lzconfig.services = {}));
})(lzconfig || (lzconfig = {}));
