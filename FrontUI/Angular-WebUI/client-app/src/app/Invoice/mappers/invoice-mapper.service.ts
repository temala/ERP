import {Injectable} from "@angular/core";
import {Invoice} from "../model/invoice";
import {InvoiceListItem} from "../model/invoice-list-item";


@Injectable()
export class InvoiceMapper {

  MapInvoice(response: any): Invoice {
    let result: Invoice = {
      invoiceId: response.id,
      dueDate: response.dueDate,
      billingDate: response.billingDate,
      message: response.message,
      client:response.client,    
    };

    return result;
  }

  MapInvoiceListItem(serviceResponsItem: any): InvoiceListItem {
    return new InvoiceListItem(serviceResponsItem.id, serviceResponsItem.name, serviceResponsItem.priceHT, serviceResponsItem.tva,serviceResponsItem.client)
  }

  MapInvoiceNextId(response: any): number {
    return response.nextInvoiceId;
  }

  Map(serviceRespons: any): InvoiceListItem[] {

    let result: InvoiceListItem[] = [];
    serviceRespons.items.forEach((serviceResponsItem: any) => {
      result.push(new InvoiceListItem(serviceResponsItem.id, serviceResponsItem.name, serviceResponsItem.priceHT, serviceResponsItem.tva,serviceResponsItem.client));
    });


    return result;
  }
}
