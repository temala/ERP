using ERP.Application.Clients.EventHandlers;
using ERP.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Microsoft.Extensions.DependencyInjection.Cras.EventHandlers;

public class CraCreatedEventHandler: INotificationHandler<ClientCreatedEvent>
{
    private readonly ILogger<CraCreatedEventHandler> _logger;

    public CraCreatedEventHandler(ILogger<CraCreatedEventHandler> logger)
    {
        _logger = logger;
    }

    public Task Handle(ClientCreatedEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("ERP Domain Event: {DomainEvent}", notification.GetType().Name);

        return Task.CompletedTask;
    }
}
