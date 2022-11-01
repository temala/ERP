import { ClientInvoiceStatusPipe } from './client-invoice-status.pipe';

describe('ClientInvoiceStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new ClientInvoiceStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
