module app.domain {
    
    export interface IApplication {
        id: string;
        name: string;
        description: string;
        createdDate: Date;
    }

    export class App implements IApplication {
        constructor(public id: string, public name: string, public description: string, public createdDate: Date) {
            
        }
    }
}