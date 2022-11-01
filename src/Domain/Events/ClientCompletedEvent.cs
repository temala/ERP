namespace ERP.Domain.Events;

public class ClientCompletedEvent : BaseEvent
{
    public ClientCompletedEvent(Client item)
    {
        Item = item;
    }

    public Client Item { get; }
}
