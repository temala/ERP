using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using MediatR;

namespace ERP.Application.Missions.Queries.GetMissionById;

public record GetMissionByIdQuery : IRequest<Mission>
{
    public int Id { get; init; }
}

// ReSharper disable once UnusedType.Global
public class GetMissionByIdQueryHandler : IRequestHandler<GetMissionByIdQuery, Mission?>
{
    private readonly IApplicationDbContext _context;

    public GetMissionByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Mission?> Handle(GetMissionByIdQuery request, CancellationToken cancellationToken)
    {
        return await _context.Missions
            .FindAsync(request.Id, cancellationToken)
            .ConfigureAwait(false);
    }
}
