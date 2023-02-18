using AutoMapper;
using AutoMapper.QueryableExtensions;
using ERP.Application.Common.Interfaces;
using ERP.Application.Common.Mappings;
using ERP.Application.Common.Models;
using MediatR;

namespace ERP.Application.Invoices.Queries.GetInvoicesWithPagination;

public record GetInvoicesWithPaginationQuery : IRequest<PaginatedList<InvoiceListItemDto>>
{
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
}

// ReSharper disable once UnusedType.Global
public class GetInvoicesWithPaginationQueryHandler : IRequestHandler<GetInvoicesWithPaginationQuery, PaginatedList<InvoiceListItemDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetInvoicesWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<InvoiceListItemDto>> Handle(GetInvoicesWithPaginationQuery request, CancellationToken cancellationToken)
    {
        return await _context.Invoices
            .OrderBy(x => x.BilligDate)
            .ProjectTo<InvoiceListItemDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize)
            .ConfigureAwait(false);
    }
}
