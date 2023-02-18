using AutoMapper;
using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using MediatR;

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
            .FindAsync(request.Id, cancellationToken)
            .ConfigureAwait(false);
    }
}