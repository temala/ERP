using ERP.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ERP.Application.CraList.EventHandlers;

public class CraCreatedEventHandler: INotificationHandler<CraCreatedEvent>
{
    private readonly ILogger<CraCreatedEventHandler> _logger;

    public CraCreatedEventHandler(ILogger<CraCreatedEventHandler> logger)
    {
        _logger = logger;
    }

    public Task Handle(CraCreatedEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("ERP Domain Event: {DomainEvent}", notification.GetType().Name);

        return Task.CompletedTask;
    }
}
