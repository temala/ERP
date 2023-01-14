namespace ERP.Domain.Events;

public class CraDeletedEvent : BaseEvent
{
    public CraDeletedEvent(Cra item)
    {
        Item = item;
    }

    public Cra Item { get; }
}
