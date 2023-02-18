import * as moment from 'moment';
import { Client } from '../../client/model/client';
import { ISearchable } from '../../common/ISearchable';
import { InvoiceLine } from './InvoiceLine';

export class Invoice implements ISearchable {

        constructor(id: string) {
                this.id = id;
        }
        
        id: string;
        invoiceId!: string;
        billingDate!: Date;        
        dueDate: number =45;                   
        message: string = "";                   
        client!:Client;
        invoiceLines!:InvoiceLine[];
}