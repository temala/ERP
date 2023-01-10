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
        return await _context.Clients
            .OrderBy(x => x.Name)
            .ProjectTo<ClientListItemDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
