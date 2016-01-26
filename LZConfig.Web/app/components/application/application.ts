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
        ID: string;
        Name: string;
        Value: string;
        Secure: boolean;
        CreatedBy: string;
        CreatedDate: Date;
        ModifiedBy: string;
        ModifiedDate: Date;
    }

    export class ApplicationVariable implements IApplicationVariable {
        constructor(public ID: string,
            public Name: string,
            public Value: string,
            public Secure: boolean,
            public CreatedBy: string,
            public CreatedDate: Date,
            public ModifiedBy: string,
            public ModifiedDate: Date) {
        }
    }

}