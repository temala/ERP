import { Product } from 'src/app/Invoice/model/product';
import { Client } from './../../client/model/client';
import { ISearchable } from './../../common/ISearchable';

export class Mission extends Product {

        constructor(id: string, name: string) {
                super();
                
                this.id = id;
                this.name = name;
        }

        client!:Client;
}