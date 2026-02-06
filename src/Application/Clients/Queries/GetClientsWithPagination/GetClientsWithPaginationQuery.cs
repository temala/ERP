using AutoMapper;
using AutoMapper.QueryableExtensions;
using ERP.Application.Common.Interfaces;
using ERP.Application.Common.Mappings;
using ERP.Application.Common.Models;
using MediatR;

namespace ERP.Application.Clients.Queries.GetClientsWithPagination;

public record GetClientsWithPaginationQuery : IRequest<PaginatedList<ClientListItemDto>>
{
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
    public string? SearchTerm { get; init; }
}

// ReSharper disable once UnusedType.Global
public class GetClientsWithPaginationQueryHandler : IRequestHandler<GetClientsWithPaginationQuery, PaginatedList<ClientListItemDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetClientsWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<ClientListItemDto>> Handle(GetClientsWithPaginationQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Clients.AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
        {
            var term = request.SearchTerm.ToLower();
            query = query.Where(c => c.Name.ToLower().Contains(term)
                || (c.CompanyName != null && c.CompanyName.ToLower().Contains(term))
                || (c.Email != null && c.Email.ToLower().Contains(term)));
        }

        return await query
            .OrderBy(x => x.Name)
            .ProjectTo<ClientListItemDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
