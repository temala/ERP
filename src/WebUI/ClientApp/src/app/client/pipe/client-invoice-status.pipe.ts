import { Pipe, PipeTransform } from '@angular/core';
import { ClientInvoiceStatus } from '../model/ClientInvoiceStatus';

@Pipe({
  name: 'clientInvoiceStatus'
})
export class ClientInvoiceStatusPipe implements PipeTransform {

  transform(value: ClientInvoiceStatus, ...args: unknown[]): string {
    switch(value)
    {
      case ClientInvoiceStatus.Draft: return $localize`Draft`;
      case ClientInvoiceStatus.Sent: return $localize`Sent`;
      case ClientInvoiceStatus.Late: return $localize`Late`;
      case ClientInvoiceStatus.Paid: return $localize`Paid`;
    }
  }
}
