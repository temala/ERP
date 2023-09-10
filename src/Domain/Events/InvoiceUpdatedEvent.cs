namespace ERP.Domain.Events;

public class InvoiceUpdatedEvent: BaseEvent
{
    public InvoiceUpdatedEvent(Invoice item)
    {
        Item = item;
    }

    public Invoice Item { get; }
}