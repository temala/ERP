using ERP.Application.Common.Exceptions;
using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using ERP.Domain.Events;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ERP.Application.Invoices.Commands.DeleteInvoice;

public record DeleteInvoiceCommand(int Id) : IRequest;

public class DeleteInvoiceCommandHandler : IRequestHandler<DeleteInvoiceCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteInvoiceCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteInvoiceCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Invoices
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Invoice), request.Id);
        }

        await _context.Invoices.Entry(entity).Collection(i => i.InvoiceLines).LoadAsync(cancellationToken);
        
        _context.InvoiceLines.RemoveRange(entity.InvoiceLines);
        _context.Invoices.Remove(entity);

        entity.AddDomainEvent(new InvoiceDeletedEvent(entity));

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
