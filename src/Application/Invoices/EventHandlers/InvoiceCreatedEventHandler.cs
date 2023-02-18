using ERP.Application.Clients.EventHandlers;
using ERP.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Microsoft.Extensions.DependencyInjection.Invoices.EventHandlers;

public class InvoiceCreatedEventHandler: INotificationHandler<ClientCreatedEvent>
{
    private readonly ILogger<InvoiceCreatedEventHandler> _logger;

    public InvoiceCreatedEventHandler(ILogger<InvoiceCreatedEventHandler> logger)
    {
        _logger = logger;
    }

    public Task Handle(ClientCreatedEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("ERP Domain Event: {DomainEvent}", notification.GetType().Name);

        return Task.CompletedTask;
    }
}
