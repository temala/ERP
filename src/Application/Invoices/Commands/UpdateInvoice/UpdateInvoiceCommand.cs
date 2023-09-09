using ERP.Application.Common.Exceptions;
using ERP.Application.Common.Interfaces;
using ERP.Application.Invoices.Queries.GetInvoicesWithPagination;
using ERP.Domain.Entities;
using MediatR;

namespace ERP.Application.Invoices.Commands.UpdateInvoice;

public record UpdateInvoiceCommand : IRequest<InvoiceListItemDto>
{
    public Client Client { get; set; }

    public int Id { get; set; }
    
    public string invoiceId { get; set; }
    
    public int DueDate { get; set; }
    
    public DateTime BillingDate { get; set; }
    
    public string Message { get; set; }

    public InvoiceStatus Status { get; set; }
    public UpdateInvoiceListItem[] InvoiceLines { get; set; }
}

public record UpdateInvoiceListItem
{
    public int Id { get; set; }
    public Product Product { get; set; }
    
    public int ProductId { get; set; }

    public DateTime Date { get; set; }

    public int Quantity { get; set; }
}

public class UpdateInvoiceCommandHandler : IRequestHandler<UpdateInvoiceCommand,InvoiceListItemDto>
{
    private readonly IApplicationDbContext _context;

    public UpdateInvoiceCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<InvoiceListItemDto> Handle(UpdateInvoiceCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Invoices
            .FindAsync(new object[] {request.Id}, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Invoice), request.Id);
        }
        
        entity.Identifier = request.invoiceId;
        entity.DueDate = request.DueDate;
        entity.Client = request.Client;

        foreach (var invoiceLine in request.InvoiceLines)
        {
            var lineToUpdate = await _context.InvoiceLines
                .FindAsync(new object[] {invoiceLine.Id}, cancellationToken);
            
            if (lineToUpdate != null)
            {
                lineToUpdate.Date = invoiceLine.Date;
                lineToUpdate.ProductId = invoiceLine.Product.Id;
                lineToUpdate.Quantity = invoiceLine.Quantity;
            }
        }
        
        entity.Message = request.Message;
        entity.BillingDate = request.BillingDate;

        await _context.SaveChangesAsync(cancellationToken);

        return new InvoiceListItemDto() {
            Id = entity.Id,
            BilligDate = entity.BillingDate,
            DueDate = entity.DueDate,
            Identifier = entity.Identifier,
            TotalTTC = entity.GetTotalTTC(),
            Client=entity.Client,
            Status = entity.Status,
            //InvoiceLines = entity.InvoiceLines.ToList()
        };
    }
}