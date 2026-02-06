using ERP.Application.Common.Interfaces;
using ERP.Application.Missions.Queries.GetMissionsWithPagination;
using ERP.Domain.Entities;
using ERP.Domain.Events;
using MediatR;

namespace ERP.Application.Missions.Commands.CreateMission;

public class CreateMissionCommand: IRequest<MissionListItemDto>
{
    public string Name { get; set; }

    public decimal? Tva { get; set; }

    public decimal? PriceHT { get; set; }

    public int ClientId { get; set; }

    public Client? Client { get; set; }
}

public class CreateMissionCommandHandler : IRequestHandler<CreateMissionCommand, MissionListItemDto>
{
    private readonly IApplicationDbContext _context;

    public CreateMissionCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<MissionListItemDto> Handle(CreateMissionCommand request, CancellationToken cancellationToken)
    {
        var clientId = request.ClientId > 0 ? request.ClientId : request.Client?.Id ?? 0;

        var entity = new Mission
        {
            Name = request.Name,
            Tva = request.Tva,
            PriceHT = request.PriceHT,
            ClientId = clientId,
        };

        entity.AddDomainEvent(new MissionCreatedEvent(entity));

        _context.Missions.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return new MissionListItemDto() {Id = entity.Id, Name = entity.Name, Tva = entity.Tva, PriceHT = entity.PriceHT, Client = request.Client};
    }
}
