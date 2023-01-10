using ERP.Application.Common.Exceptions;
using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using ERP.Domain.Events;
using MediatR;

namespace ERP.Application.Missions.Commands.DeleteMission;

public record DeleteMissionCommand(int Id) : IRequest;

public class DeleteMissionCommandHandler : IRequestHandler<DeleteMissionCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteMissionCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteMissionCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Missions
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Mission), request.Id);
        }

        _context.Missions.Remove(entity);

        entity.AddDomainEvent(new MissionDeletedEvent(entity));

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
