namespace ERP.Domain.Events;

public class ClientDeletedEvent : BaseEvent
{
    public ClientDeletedEvent(Client item)
    {
        Item = item;
    }

    public Client Item { get; }
}
