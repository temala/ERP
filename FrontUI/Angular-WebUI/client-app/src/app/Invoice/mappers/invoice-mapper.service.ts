import { unit } from './../model/unit';
import { map } from 'rxjs';
import { InvoiceStatus } from './../model/InvoiceStatus';
import {Injectable} from "@angular/core";
import * as moment from "moment";
import {Invoice} from "../model/invoice";
import {InvoiceListItem} from "../model/invoice-list-item";
import { InvoiceLine } from '../model/InvoiceLine';


@Injectable()
export class InvoiceMapper {

  MapInvoice(response: any): Invoice {

    let result: Invoice = {
      id:response.id,
      invoiceId: response.identifier,
      dueDate: response.dueDate,
      billingDate: response.billingDate,
      message: response.message,
      client:response.client,
      invoiceLines: response.invoiceLines.map(l => {
        let line = new InvoiceLine();
        line.id=l.id;
        line.product = l.product;
        line.date = new Date(l.date);
        line.quantity = l.quantity;
        line.unit = l.unit;
        return line;
      }),
      status:response.status,
    };

    return result;
  }

  MapInvoiceListItem(serviceResponsItem: any): InvoiceListItem {
    return new InvoiceListItem(serviceResponsItem.id,serviceResponsItem.identifier, serviceResponsItem.client, moment(serviceResponsItem.billigDate).toDate(),moment(serviceResponsItem.billigDate).add(serviceResponsItem.dueDate,'d').toDate(),serviceResponsItem.totalTTC, serviceResponsItem.status);
  }

  MapInvoiceNextId(response: any): number {
    return response.nextInvoiceId;
  }

  Map(serviceRespons: any): InvoiceListItem[] {

    let result: InvoiceListItem[] = [];
    serviceRespons.items.forEach((serviceResponsItem: any) => {
      result.push(new InvoiceListItem(serviceResponsItem.id,serviceResponsItem.identifier, serviceResponsItem.client, moment(serviceResponsItem.billigDate).toDate(), moment(serviceResponsItem.billigDate).add(serviceResponsItem.dueDate,'d').toDate(),serviceResponsItem.totalTTC, serviceResponsItem.status));
    });

    return result;
  }
}
