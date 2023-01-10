namespace ERP.Domain.Events;

public class MissionCreated: BaseEvent
{
    public MissionCreated(Mission item)
    {
        Item = item;
    }

    public Mission Item { get; }
}