using AutoMapper;
using AutoMapper.QueryableExtensions;
using ERP.Application.Common.Interfaces;
using ERP.Application.Common.Mappings;
using ERP.Application.Common.Models;
using MediatR;
using Microsoft.Extensions.DependencyInjection.Missions.Queries.GetMissionsWithPagination;

namespace ERP.Application.Clients.Queries.GetClientsWithPagination;

public record GetMissionsWithPaginationQuery : IRequest<PaginatedList<MissionListItemDto>>
{
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
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
        return await _context.Missions
            .OrderBy(x => x.Name)
            .ProjectTo<MissionListItemDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
