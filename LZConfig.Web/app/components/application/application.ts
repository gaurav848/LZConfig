namespace lzconfig.domain {
    
    export interface IApplication {
        ID: string;
        Name: string;
        URL: string;
        Description: string;
        CreatedDate: Date;
        tblApplicationVariable: IApplicationVariable[];
    }
    
    export class Application implements IApplication {
        constructor(public ID: string, public Name: string, public Description: string, public URL: string, public CreatedDate: Date, public tblApplicationVariable: IApplicationVariable[]) {          
        }
    }

    export interface IApplicationVariable {
        ApplicationID: string;
        Name: string;
        Value: string;
        Secure: boolean;
        CreatedBy: string;
        CreatedDate: Date;
        ModifiedBy: string;
        ModifiedDate: Date;
    }

    export class ApplicationVariable implements IApplicationVariable {
        constructor(public ApplicationID: string,
            public Name: string,
            public Value: string,
            public Secure: boolean,
            public CreatedBy: string,
            public CreatedDate: Date,
            public ModifiedBy: string,
            public ModifiedDate: Date) {
        }
    }


    export interface IApplicationConnection {
        ApplicationID: string;
        Name: string;
        ConnectionString: string;
        VirtualConnectionString: boolean;
        Password: string;
        CommandTimeout: number;
        ProviderName: string;
        CreatedBy: string;
        CreatedDate: Date;
        ModifiedBy: string;
        ModifiedDate: Date;
    }

    export class ApplicationConnection implements IApplicationConnection {

        constructor(public ApplicationID: string,
            public Name: string,
            public ConnectionString: string,
            public VirtualConnectionString: boolean,
            public Password: string,
            public CommandTimeout: number,
            public ProviderName: string,
            public CreatedBy: string,
            public CreatedDate: Date,
            public ModifiedBy: string,
            public ModifiedDate: Date){
        }
    }


    export interface IConnectionType {
        ID: string;
        Name: string;
        Description: string;
        DefaultConnectionString: boolean;
        ProviderName: string;
        CreatedBy: string;
        CreatedDate: Date;
        ModifiedBy: string;
        ModifiedDate: Date;
    }

    export class ConnectionType implements IConnectionType {

        constructor(public ID: string,
            public Name: string,
            public Description: string,
            public DefaultConnectionString: boolean,
            public ProviderName: string,
            public CreatedBy: string,
            public CreatedDate: Date,
            public ModifiedBy: string,
            public ModifiedDate: Date) {
        }
    }
}