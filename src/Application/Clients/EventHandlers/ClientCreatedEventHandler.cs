using ERP.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ERP.Application.Clients.EventHandlers;

public class ClientCreatedEventHandler : INotificationHandler<ClientCreatedEvent>
{
    private readonly ILogger<ClientCreatedEventHandler> _logger;

    public ClientCreatedEventHandler(ILogger<ClientCreatedEventHandler> logger)
    {
        _logger = logger;
    }

    public Task Handle(ClientCreatedEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("ERP Domain Event: {DomainEvent}", notification.GetType().Name);

        return Task.CompletedTask;
    }
}
