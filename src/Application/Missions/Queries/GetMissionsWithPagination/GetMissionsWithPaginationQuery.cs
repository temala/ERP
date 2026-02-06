using AutoMapper;
using AutoMapper.QueryableExtensions;
using ERP.Application.Common.Interfaces;
using ERP.Application.Common.Mappings;
using ERP.Application.Common.Models;
using MediatR;

namespace ERP.Application.Missions.Queries.GetMissionsWithPagination;

public record GetMissionsWithPaginationQuery : IRequest<PaginatedList<MissionListItemDto>>
{
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
    public string? SearchTerm { get; init; }
}

// ReSharper disable once UnusedType.Global
public class GetMissionsWithPaginationQueryHandler : IRequestHandler<GetMissionsWithPaginationQuery, PaginatedList<MissionListItemDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetMissionsWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<MissionListItemDto>> Handle(GetMissionsWithPaginationQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Missions.AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
        {
            var term = request.SearchTerm.ToLower();
            query = query.Where(m => m.Name.ToLower().Contains(term));
        }

        return await query
            .OrderBy(x => x.Name)
            .ProjectTo<MissionListItemDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
