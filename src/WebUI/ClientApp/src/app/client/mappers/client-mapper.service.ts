import {ClientInvoiceListItem} from './../model/ClientInvoiceListItem';
import {Injectable} from "@angular/core";
import {Client} from "../model/client";
import {ClientListItem} from "../model/client-list-item";
import {ClientInvoiceStatus} from '../model/ClientInvoiceStatus';

@Injectable()
export class ClientMapper {

  MapClient(response: any): Client {
    let result: Client = {
      id: response.id,
      name: response.name,
      contactName: response.contactName,
      email: response.email,
      telephone: response.telephone,
      companyName: response.companyName,
      siret: response.siret,
      tva: response.tva,
      title: response.title,
      address: response.address,
      postalCode: response.postalCode,
      town: response.town,
      country: response.country,
    };

    return result;
  }

  MapClientListItem(serviceResponsItem: any): ClientListItem {
    return new ClientListItem(serviceResponsItem.id, serviceResponsItem.name, serviceResponsItem.openInvoicesGrossTotal, serviceResponsItem.paidInvoicesGrossTotal)
  }

  MapClientNextId(response: any): number {
    return response.nextClientId;
  }

  MapClientInvoices(serviceRespons: any): ClientInvoiceListItem[] {
    let result: ClientInvoiceListItem[] = [];
    serviceRespons.data.invoices.forEach((serviceResponsItem: any) => {
      let invoice: ClientInvoiceListItem = {
        id: serviceResponsItem.Id,
        invoiceNumber: serviceResponsItem.InvoiceNumber,
        totalTTC: serviceResponsItem.TotalTTC,
        totalHT: serviceResponsItem.TotalHT,
        tax: serviceResponsItem.TVA,
        issueDate: serviceResponsItem.issueDate,
        dueDate: serviceResponsItem.DueDate,
        daysToPay: serviceResponsItem.DaysToPay,
        status: <ClientInvoiceStatus>serviceResponsItem.Status
      };
      result.push(invoice);
    });
    return result;
  }

  Map(serviceRespons: any): ClientListItem[] {

    let result: ClientListItem[] = [];
    serviceRespons.items.forEach((serviceResponsItem: any) => {
      result.push(new ClientListItem(serviceResponsItem.id, serviceResponsItem.name, serviceResponsItem.openInvoicesGrossTotal, serviceResponsItem.paidInvoicesGrossTotal));
    });


    return result;
  }
}
