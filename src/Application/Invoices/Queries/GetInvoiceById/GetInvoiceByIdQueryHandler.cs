using AutoMapper;
using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Microsoft.Extensions.DependencyInjection.Invoices.Queries.GetInvoiceById;

public record GetInvoiceByIdQuery : IRequest<Invoice>
{
    public int Id { get; init; }
}

// ReSharper disable once UnusedType.Global
public class GetInvoiceByIdQueryHandler : IRequestHandler<GetInvoiceByIdQuery, Invoice?>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetInvoiceByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<Invoice?> Handle(GetInvoiceByIdQuery request, CancellationToken cancellationToken)
    {
        return await _context.Invoices
            .Include(invoice => invoice.Client)
            .Include(invoice=>invoice.InvoiceLines).ThenInclude(l=>l.Product)
            .FirstOrDefaultAsync(invoice => invoice.Id == request.Id, cancellationToken: cancellationToken)
            .ConfigureAwait(false);
    }
}