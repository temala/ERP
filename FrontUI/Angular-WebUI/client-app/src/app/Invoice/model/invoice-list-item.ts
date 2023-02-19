import { ClientInvoiceStatus } from './../../client/model/ClientInvoiceStatus';
import { Client } from '../../client/model/client';
import { ISearchable } from "src/app/common/ISearchable";
import { InvoiceStatus } from './InvoiceStatus';


export class InvoiceListItem implements ISearchable {

        id: string;
        identifier: string;
        date: Date;
        dueDate: Date;
        client: Client;
        totalTTc: number;
        status: InvoiceStatus;

        constructor(id: string, identifier: string, client: Client, date: Date, dueDate: Date, totalTTC: number,status:InvoiceStatus) {
                this.id = id;
                this.identifier = identifier;
                this.date = date;
                this.dueDate = dueDate;
                this.client = client;
                this.totalTTc = totalTTC;
                this.status = status;
        }
}


