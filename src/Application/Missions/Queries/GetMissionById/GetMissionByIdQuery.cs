using AutoMapper;
using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using MediatR;

namespace Microsoft.Extensions.DependencyInjection.Missions.Queries.GetMissionById;


public record GetMissionByIdQuery : IRequest<Mission>
{
    public int Id { get; init; }
}

// ReSharper disable once UnusedType.Global
public class GetMissionByIdQueryHandler : IRequestHandler<GetMissionByIdQuery, Mission?>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetMissionByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<Mission?> Handle(GetMissionByIdQuery request, CancellationToken cancellationToken)
    {
        return await _context.Missions.FindAsync(request.Id);
    }
}
