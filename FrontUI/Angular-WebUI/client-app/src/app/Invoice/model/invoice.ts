import * as moment from 'moment';
import { Client } from '../../client/model/client';
import { ISearchable } from '../../common/ISearchable';
import { InvoiceLine } from './InvoiceLine';
import { InvoiceStatus } from './InvoiceStatus';

export class Invoice implements ISearchable {

        constructor(id: number) {
                this.id = id;
        }

        id: number;
        invoiceId!: string;
        billingDate!: Date;
        dueDate: number =45;
        message: string = "";
        client!:Client;
        status!:InvoiceStatus;
        invoiceLines!:InvoiceLine[];
}
