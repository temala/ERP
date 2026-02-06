using AutoMapper;
using AutoMapper.QueryableExtensions;
using ERP.Application.Common.Interfaces;
using ERP.Application.Common.Mappings;
using ERP.Application.Common.Models;
using MediatR;

namespace ERP.Application.CraList.Queries.GetCraListWithPagination;

public record GetCraListWithPaginationQuery : IRequest<PaginatedList<CraListItemDto>>
{
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
}

// ReSharper disable once UnusedType.Global
public class GetCraListWithPaginationQueryHandler : IRequestHandler<GetCraListWithPaginationQuery, PaginatedList<CraListItemDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetCraListWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<CraListItemDto>> Handle(GetCraListWithPaginationQuery request, CancellationToken cancellationToken)
    {
        return await _context.CraList
            .OrderBy(x => x.Month)
            .ProjectTo<CraListItemDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
