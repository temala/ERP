import { Client } from '../../client/model/client';
import { ISearchable } from '../../common/ISearchable';

export class Invoice implements ISearchable {

        constructor(id: number, name: string) {
                this.id = id;
                this.name = name;
        }

        id: number;
        name: string;        
        priceHT: number =0;           
        tva: number = 0;
        client!:Client;
}