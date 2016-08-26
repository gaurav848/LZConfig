var lzconfig;
(function (lzconfig) {
    var ApplicationConnectionController = (function () {
        function ApplicationConnectionController($uibModalInstance, dataAccessService, connection) {
            var _this = this;
            this.$uibModalInstance = $uibModalInstance;
            this.dataAccessService = dataAccessService;
            this.connection = connection;
            var connectionTypeResource = dataAccessService.getConnectionTypeResource();
            connectionTypeResource.query()
                .$promise
                .then(function (data) { _this.connectionTypes = data.value; })
                .catch(function (response) { console.log(response); });
        }
        ApplicationConnectionController.prototype.connectionTypeChange = function () {
            var _this = this;
            console.log("connectionTypeChange called");
            console.log(this.connectionTypeId);
            var connectionType = this.connectionTypes.filter(function (x) { return x.ID === _this.connectionTypeId; })[0];
            this.connection.ConnectionString = connectionType.DefaultConnectionString;
            this.connection.ProviderName = connectionType.ProviderName;
        };
        ApplicationConnectionController.prototype.saveConnection = function () {
            var _this = this;
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
                .then(function (data) {
                console.log(data);
                _this.$uibModalInstance.close();
            })
                .catch(function (response) { console.log(response); });
        };
        ApplicationConnectionController.prototype.cancel = function () {
            this.$uibModalInstance.dismiss("cancel");
        };
        ApplicationConnectionController.prototype.open = function () {
        };
        ApplicationConnectionController.$inject = ["$uibModalInstance", "dataAccessService", "connection"];
        return ApplicationConnectionController;
    }());
    angular
        .module("LZConfig")
        .controller("ApplicationConnectionController", ApplicationConnectionController);
})(lzconfig || (lzconfig = {}));
