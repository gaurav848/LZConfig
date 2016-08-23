namespace lzconfig {

    class ApplicationConnectionController {

        connectionTypes: lzconfig.IConnectionType[];
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
            var connectionType = this.connectionTypes.filter(x=> x.ID === this.connectionTypeId)[0];
            this.connection.ConnectionString = connectionType.DefaultConnectionString;
            this.connection.ProviderName = connectionType.ProviderName;
        }

        saveConnection() {
            console.log("saveConnection:" + JSON.stringify(this.connection));
            if (this.connection.Password != "" && this.connection.Password != this.verifyPassword)
                console.log("passwords set but do not verify");
            this.dataAccessService.performUpdate = !(this.connection.CreatedDate == null);
            var applicationConnectionResource = this.dataAccessService.getApplicationConnectionResource();
            if (this.connection.CreatedDate == null)
                this.connection.CreatedDate = new Date();
            if (this.connection.ModifiedDate == null)
                this.connection.ModifiedDate = new Date();
            this.connection.VirtualConnectionString = this.connection.ConnectionString;
            applicationConnectionResource.save(this.connection)
                .$promise
                .then((data: any) => {
                    console.log(data); this.$uibModalInstance.close(); })
                .catch((response) => { console.log(response) });


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
