namespace ERP.Domain.Events;

public class MissionCreatedEvent: BaseEvent
{
    public MissionCreatedEvent(Mission item)
    {
        Item = item;
    }

    public Mission Item { get; }
}