using ERP.Application.Clients.Commands.CreateClient;
using ERP.Application.Clients.Queries.GetClientsWithPagination;
using ERP.Application.Common.Interfaces;
using ERP.Application.Invoices.Queries.GetInvoicesWithPagination;
using ERP.Domain.Entities;
using ERP.Domain.Events;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Microsoft.Extensions.DependencyInjection.Invoices.Commands.CreateInvoice;

public class CreateInvoiceCommand: IRequest<InvoiceListItemDto>
{
    public Client Client { get; set; }

    public string Id { get; set; }
    
    public string invoiceId { get; set; }
    
    public int DueDate { get; set; }
    
    public DateTime BillingDate { get; set; }
    
    public string Message { get; set; }

    public InvoiceStatus Status { get; set; }
    public InvoiceLine[] InvoiceLines { get; set; }
}

public class CreateInvoiceCommandHandler : IRequestHandler<CreateInvoiceCommand, InvoiceListItemDto>
{
    private readonly IApplicationDbContext _context;

    public CreateInvoiceCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<InvoiceListItemDto> Handle(CreateInvoiceCommand request, CancellationToken cancellationToken)
    {
        var entity = new Invoice
        {
            Identifier = request.invoiceId,
            DueDate = request.DueDate,
            Message = request.Message,
            BillingDate = request.BillingDate,
            ClientId = request.Client.Id,
            InvoiceLines = request.InvoiceLines.Select(l=>new InvoiceLine(){ProductId = l.Product.Id,Date = l.Date,Quantity = l.Quantity}).ToList()
        };

        entity.AddDomainEvent(new InvoiceCreatedEvent(entity));

        _context.Invoices.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        var result =await _context.Invoices.Include(i=>i.Client).Include(i => i.InvoiceLines).ThenInclude(l => l.Product).FirstAsync(i => i.Id == entity.Id);
            
        return new InvoiceListItemDto() {Id = entity.Id,
            BilligDate = result.BillingDate,
            DueDate = result.DueDate,
            Identifier = result.Identifier,
            TotalTTC = result.GetTotalTTC(),
            Client=result.Client,
            Status = result.Status,
            InvoiceLines = result.InvoiceLines.ToList()
        };
    }
}