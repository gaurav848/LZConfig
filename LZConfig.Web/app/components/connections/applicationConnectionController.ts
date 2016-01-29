namespace lzconfig {

    class ApplicationConnectionController {

        connectionTypes: lzconfig.domain.IConnectionType[];
        connectionTypeId: string;

        static $inject = ["$uibModalInstance", "dataAccessService", "connection"];
        constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
                    private dataAccessService: lzconfig.services.DataAccessService,
                    private connection) {
            
            var connectionTypeResource = dataAccessService.getConnectionTypeResource();

            connectionTypeResource.query()
                .$promise
                .then((data: any) => { this.connectionTypes = data.value })
                .catch((response) => { console.log(response) });
        }

        connectionTypeChange() {
            console.log("connectionTypeChange called");
            console.log(this.connectionTypeId);
            var connectionType = this.connectionTypes[this.connectionTypeId];
            this.connection.ConnectionString = connectionType.DefaultConnectionString;
        }

        save(connection) {
            console.log("save called");
        }
        cancel() {
            this.$uibModalInstance.dismiss("cancel");
        }

        open() {

        }
    }

    angular
        .module("LZConfig")
        .controller("ApplicationConnectionController",
        ApplicationConnectionController);
}
