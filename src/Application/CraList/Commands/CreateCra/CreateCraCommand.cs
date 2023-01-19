using ERP.Application.Clients.Commands.CreateClient;
using ERP.Application.Clients.Queries.GetClientsWithPagination;
using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using ERP.Domain.Events;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Cras.Queries.GetCrasWithPagination;

namespace Microsoft.Extensions.DependencyInjection.Cras.Commands.CreateCra;

public class CreateCraCommand: IRequest<CraListItemDto>
{
    public int Month { get; set; }
    
    public int Year { get; set; }
    
    public DateTime[] Days { get; set; }

    public int MissionId { get; set; }
    
    public Mission Mission { get; set; }
}

public class CreateCraCommandHandler : IRequestHandler<CreateCraCommand, CraListItemDto>
{
    private readonly IApplicationDbContext _context;

    public CreateCraCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<CraListItemDto> Handle(CreateCraCommand request, CancellationToken cancellationToken)
    {
        var entity = new Cra
        {
            Month = request.Month,
            Year = request.Year,
            MissionId = request.MissionId,
            Days = request.Days.Select(day=>new CraDay(){Year = day.Year,Month = day.Month,Day = day.Day}).ToList()
        };

        entity.AddDomainEvent(new CraCreatedEvent(entity));

        _context.CraList.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        var savedCra = _context.CraList.Include(cra=>cra.Mission).OrderBy(cra=>cra.Id).Last();
        
        return new CraListItemDto() {Id = savedCra.Id, Month = savedCra.Month,Year = savedCra.Year,Days = savedCra.Days.ToList(), Mission= savedCra.Mission};
    }
}