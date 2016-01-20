namespace lzconfig.domain {
    
    export interface IApplication {
        ID: string;
        Name: string;
        URL: string;
        Description: string;
        CreatedDate: Date;
    }
    
    export class App implements IApplication {
        constructor(public ID: string, public Name: string, public Description: string, public URL: string,  public CreatedDate: Date) {
            
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
}