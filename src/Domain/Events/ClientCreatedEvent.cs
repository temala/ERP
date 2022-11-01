namespace ERP.Domain.Events;

public class ClientCreatedEvent : BaseEvent
{
    public ClientCreatedEvent(Client item)
    {
        Item = item;
    }

    public Client Item { get; }
}
