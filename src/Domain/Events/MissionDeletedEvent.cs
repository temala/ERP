namespace ERP.Domain.Events;

public class MissionDeletedEvent : BaseEvent
{
    public MissionDeletedEvent(Mission item)
    {
        Item = item;
    }

    public Mission Item { get; }
}
