
namespace ERP.Domain.Events;

public class CraCreatedEvent: BaseEvent
{
    public CraCreatedEvent(Cra item)
    {
        Item = item;
    }

    public Cra Item { get; }
}