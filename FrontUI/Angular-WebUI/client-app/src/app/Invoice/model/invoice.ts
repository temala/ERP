import * as moment from 'moment';
import { Client } from '../../client/model/client';
import { ISearchable } from '../../common/ISearchable';

export class Invoice implements ISearchable {

        constructor(id: string) {
                this.invoiceId = id;
        }

        invoiceId: string;
        billingDate!: Date;        
        dueDate: number =45;                   
        message!: string;                   
        client!:Client;
}