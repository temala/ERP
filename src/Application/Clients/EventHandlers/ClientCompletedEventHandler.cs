using ERP.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ERP.Application.Clients.EventHandlers;

public class ClientCompletedEventHandler : INotificationHandler<ClientCompletedEvent>
{
    private readonly ILogger<ClientCompletedEventHandler> _logger;

    public ClientCompletedEventHandler(ILogger<ClientCompletedEventHandler> logger)
    {
        _logger = logger;
    }

    public Task Handle(ClientCompletedEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("ERP Domain Event: {DomainEvent}", notification.GetType().Name);

        return Task.CompletedTask;
    }
}
