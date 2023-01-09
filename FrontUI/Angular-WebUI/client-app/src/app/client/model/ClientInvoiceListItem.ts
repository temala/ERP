import { ISearchable } from './../../common/ISearchable';
import { ClientInvoiceStatus } from "./ClientInvoiceStatus";


export class ClientInvoiceListItem implements ISearchable {
        constructor(id: number,invoiceNumber:string) {
                this.id = id;
                this.invoiceNumber = invoiceNumber;
        }

        id: number;
        invoiceNumber:string;
        totalTTC!: number;
        totalHT!: number;
        tax!: number;
        issueDate!: Date;
        dueDate!: Date;
        daysToPay!: number;
        status!: ClientInvoiceStatus;
}
