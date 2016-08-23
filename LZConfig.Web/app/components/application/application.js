var lzconfig;
(function (lzconfig) {
    var Application = (function () {
        function Application(ID, Name, Description, URL, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate, tblApplicationConnection, tblApplicationVariable) {
            this.ID = ID;
            this.Name = Name;
            this.Description = Description;
            this.URL = URL;
            this.CreatedBy = CreatedBy;
            this.CreatedDate = CreatedDate;
            this.ModifiedBy = ModifiedBy;
            this.ModifiedDate = ModifiedDate;
            this.tblApplicationConnection = tblApplicationConnection;
            this.tblApplicationVariable = tblApplicationVariable;
        }
        return Application;
    }());
    lzconfig.Application = Application;
    var ApplicationVM = (function () {
        function ApplicationVM(ID, Name, Description, URL, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate) {
            this.ID = ID;
            this.Name = Name;
            this.Description = Description;
            this.URL = URL;
            this.CreatedBy = CreatedBy;
            this.CreatedDate = CreatedDate;
            this.ModifiedBy = ModifiedBy;
            this.ModifiedDate = ModifiedDate;
        }
        return ApplicationVM;
    }());
    lzconfig.ApplicationVM = ApplicationVM;
    var ApplicationVariable = (function () {
        function ApplicationVariable(ApplicationID, Name, Value, Secure, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate) {
            this.ApplicationID = ApplicationID;
            this.Name = Name;
            this.Value = Value;
            this.Secure = Secure;
            this.CreatedBy = CreatedBy;
            this.CreatedDate = CreatedDate;
            this.ModifiedBy = ModifiedBy;
            this.ModifiedDate = ModifiedDate;
        }
        return ApplicationVariable;
    }());
    lzconfig.ApplicationVariable = ApplicationVariable;
    var ApplicationConnection = (function () {
        function ApplicationConnection(ApplicationID, Name, ConnectionString, VirtualConnectionString, Password, CommandTimeout, ProviderName, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate) {
            this.ApplicationID = ApplicationID;
            this.Name = Name;
            this.ConnectionString = ConnectionString;
            this.VirtualConnectionString = VirtualConnectionString;
            this.Password = Password;
            this.CommandTimeout = CommandTimeout;
            this.ProviderName = ProviderName;
            this.CreatedBy = CreatedBy;
            this.CreatedDate = CreatedDate;
            this.ModifiedBy = ModifiedBy;
            this.ModifiedDate = ModifiedDate;
        }
        return ApplicationConnection;
    }());
    lzconfig.ApplicationConnection = ApplicationConnection;
    var ConnectionType = (function () {
        function ConnectionType(ID, Name, Description, DefaultConnectionString, ProviderName, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate) {
            this.ID = ID;
            this.Name = Name;
            this.Description = Description;
            this.DefaultConnectionString = DefaultConnectionString;
            this.ProviderName = ProviderName;
            this.CreatedBy = CreatedBy;
            this.CreatedDate = CreatedDate;
            this.ModifiedBy = ModifiedBy;
            this.ModifiedDate = ModifiedDate;
        }
        return ConnectionType;
    }());
    lzconfig.ConnectionType = ConnectionType;
})(lzconfig || (lzconfig = {}));
//# sourceMappingURL=application.js.map