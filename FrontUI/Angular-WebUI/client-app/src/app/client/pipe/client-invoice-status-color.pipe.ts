import { Pipe, PipeTransform } from '@angular/core';
import { ClientInvoiceStatus } from '../model/ClientInvoiceStatus';

@Pipe({
  name: 'clientInvoiceStatusColor'
})
export class ClientInvoiceStatusColorPipe implements PipeTransform {


  transform(value: ClientInvoiceStatus, ...args: unknown[]): string {
    switch(value)
    {
      case ClientInvoiceStatus.Draft: return "#a6a6a6";
      case ClientInvoiceStatus.Sent: return  "#0c19ab";
      case ClientInvoiceStatus.Late: return  "#c20e08";
      case ClientInvoiceStatus.Paid: return  "#25b005";
    }
  }
}
