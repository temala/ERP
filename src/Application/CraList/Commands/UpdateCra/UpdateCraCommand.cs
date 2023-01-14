using ERP.Application.Common.Exceptions;
using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using MediatR;

namespace ERP.Application.Missions.Commands.UpdateMission;

public record UpdateMissionCommand : IRequest<Mission>
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    public decimal PriceHT { get; set; }
    public decimal Tva { get; set; }

   
}

public class UpdateMissionCommandHandler : IRequestHandler<UpdateMissionCommand,Mission>
{
    private readonly IApplicationDbContext _context;

    public UpdateMissionCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Mission> Handle(UpdateMissionCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Missions
            .FindAsync(new object[] {request.Id}, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Mission), request.Id);
        }

        entity.Name = request.Name;
        entity.PriceHT = request.PriceHT;
        entity.Tva = request.Tva;
        

        await _context.SaveChangesAsync(cancellationToken);

        return entity;
    }
}