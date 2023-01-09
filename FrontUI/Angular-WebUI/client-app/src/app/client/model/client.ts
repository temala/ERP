import { ISearchable } from './../../common/ISearchable';

export class Client implements ISearchable {

        constructor(id: number, name: string) {
                this.id = id;
                this.name = name;
        }

        id: number;
        name: string;
        contactName: string = "";
        email: string = "";
        telephone: string = "";
        companyName: string = "";
        siret: string = "";
        tva: string = "";
        title: string = "";
        address: string = "";
        postalCode: string = "";
        town: string = "";
        country: string = "";
}
