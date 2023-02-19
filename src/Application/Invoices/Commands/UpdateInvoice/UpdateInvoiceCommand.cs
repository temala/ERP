using ERP.Application.Common.Exceptions;
using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using MediatR;

namespace ERP.Application.Invoices.Commands.UpdateInvoice;

public record UpdateInvoiceCommand : IRequest<Invoice>
{
    public Client Client { get; set; }

    public int Id { get; set; }
    public string Identifier { get; set; }
    
    public int DueDate { get; set; }
    
    public DateTime BilligDate { get; set; }
    
    public string Message { get; set; }

    public InvoiceLine[] InvoiceLines { get; set; }
}

public class UpdateInvoiceCommandHandler : IRequestHandler<UpdateInvoiceCommand,Invoice>
{
    private readonly IApplicationDbContext _context;

    public UpdateInvoiceCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Invoice> Handle(UpdateInvoiceCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Invoices
            .FindAsync(new object[] {request.Id}, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Invoice), request.Id);
        }

        entity.Identifier = request.Identifier;
        entity.DueDate = request.DueDate;
        entity.Client = request.Client;
        entity.InvoiceLines = request.InvoiceLines.ToList();
        entity.Message = request.Message;
        entity.BillingDate = request.BilligDate;

        await _context.SaveChangesAsync(cancellationToken);

        return entity;
    }
}