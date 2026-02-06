using AutoMapper;
using AutoMapper.QueryableExtensions;
using ERP.Application.Common.Interfaces;
using ERP.Application.Common.Mappings;
using ERP.Application.Common.Models;
using MediatR;
using Microsoft.Extensions.DependencyInjection.Cras.Queries.GetCrasWithPagination;

namespace ERP.Application.Clients.Queries.GetClientsWithPagination;

public record GetCrasWithPaginationQuery : IRequest<PaginatedList<CraListItemDto>>
{
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
    public string? SearchTerm { get; init; }
}

// ReSharper disable once UnusedType.Global
public class GetCrasWithPaginationQueryHandler : IRequestHandler<GetCrasWithPaginationQuery, PaginatedList<CraListItemDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetCrasWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<CraListItemDto>> Handle(GetCrasWithPaginationQuery request, CancellationToken cancellationToken)
    {
        var query = _context.CraList.AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
        {
            var term = request.SearchTerm.ToLower();
            query = query.Where(c => c.Mission.Name.ToLower().Contains(term));
        }

        return await query
            .OrderBy(x => x.Month)
            .ProjectTo<CraListItemDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
