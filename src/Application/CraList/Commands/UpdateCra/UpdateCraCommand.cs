using ERP.Application.Common.Exceptions;
using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using MediatR;

namespace ERP.Application.CraList.Commands.UpdateCra;

public record UpdateCraCommand : IRequest<Cra>
{
    public int Id { get; set; }
    
    public int Month { get; set; }
    
    public int Year { get; set; }
    
    public CraDay[] days { get; set; }

    public int MissionId { get; set; }
}

public class UpdateCraCommandHandler : IRequestHandler<UpdateCraCommand,Cra>
{
    private readonly IApplicationDbContext _context;

    public UpdateCraCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Cra> Handle(UpdateCraCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.CraList
            .FindAsync(new object[] {request.Id}, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Cra), request.Id);
        }

        entity.Month = request.Month;
        entity.Year = request.Year;
        entity.Days = request.days.ToList();
        entity.MissionId = request.MissionId;
        

        await _context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return entity;
    }
}