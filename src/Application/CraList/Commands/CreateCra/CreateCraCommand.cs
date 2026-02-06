using ERP.Application.Common.Interfaces;
using ERP.Application.CraList.Queries.GetCraListWithPagination;
using ERP.Domain.Entities;
using ERP.Domain.Events;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ERP.Application.CraList.Commands.CreateCra;

public class CreateCraCommand: IRequest<CraListItemDto>
{
    public int Month { get; set; }

    public int Year { get; set; }

    public CraDay[] Days { get; set; }

    public int MissionId { get; set; }

    public Mission? Mission { get; set; }
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
            Days = request.Days.Select(day => new CraDay() { Year = day.Year, Month = day.Month, Day = day.Day, IsHalfDay = day.IsHalfDay }).ToList()
        };

        entity.AddDomainEvent(new CraCreatedEvent(entity));

        _context.CraList.Add(entity);

        await _context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        var savedCra = await _context.CraList
            .Include(cra => cra.Mission)
            .FirstOrDefaultAsync(cra => cra.Id == entity.Id, cancellationToken);

        if (savedCra == null)
        {
            return new CraListItemDto() { Id = entity.Id, Month = entity.Month, Year = entity.Year, Days = entity.Days.ToList(), Mission = request.Mission };
        }

        return new CraListItemDto() { Id = savedCra.Id, Month = savedCra.Month, Year = savedCra.Year, Days = savedCra.Days.ToList(), Mission = savedCra.Mission };
    }
}
