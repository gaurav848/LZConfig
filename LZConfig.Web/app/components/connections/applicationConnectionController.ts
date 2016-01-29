namespace lzconfig {

    class ApplicationConnectionController {

        connectionTypes: lzconfig.domain.IConnectionType[];
        connectionTypeId: string;
        verifyPassword: string;

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
            var connectionType = this.connectionTypes.filter(x=> x.ID == this.connectionTypeId)[0];
            this.connection.ConnectionString = connectionType.DefaultConnectionString;
            this.connection.ProviderName = connectionType.ProviderName;
        }

        save(connection) {
            console.log("save called");
            if (connection.Password != "" && connection.Password != this.verifyPassword)
                console.log("passwords set but do not verify");
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
