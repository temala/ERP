using ERP.Application.Clients.EventHandlers;
using ERP.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Microsoft.Extensions.DependencyInjection.Missions.EventHandlers;

public class MissionCreatedEventHandler: INotificationHandler<ClientCreatedEvent>
{
    private readonly ILogger<MissionCreatedEventHandler> _logger;

    public MissionCreatedEventHandler(ILogger<MissionCreatedEventHandler> logger)
    {
        _logger = logger;
    }

    public Task Handle(ClientCreatedEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("ERP Domain Event: {DomainEvent}", notification.GetType().Name);

        return Task.CompletedTask;
    }
}
