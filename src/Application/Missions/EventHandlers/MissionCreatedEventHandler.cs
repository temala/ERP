using ERP.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ERP.Application.Missions.EventHandlers;

public class MissionCreatedEventHandler: INotificationHandler<MissionCreatedEvent>
{
    private readonly ILogger<MissionCreatedEventHandler> _logger;

    public MissionCreatedEventHandler(ILogger<MissionCreatedEventHandler> logger)
    {
        _logger = logger;
    }

    public Task Handle(MissionCreatedEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("ERP Domain Event: {DomainEvent}", notification.GetType().Name);

        return Task.CompletedTask;
    }
}
