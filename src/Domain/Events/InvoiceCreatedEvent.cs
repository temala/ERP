namespace ERP.Domain.Events;

public class InvoiceCreatedEvent: BaseEvent
{
    public InvoiceCreatedEvent(Invoice item)
    {
        Item = item;
    }

    public Invoice Item { get; }
}