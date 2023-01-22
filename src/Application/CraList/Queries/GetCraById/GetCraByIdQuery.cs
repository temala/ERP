using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ERP.Application.CraList.Queries.GetCraById;


public record GetCraByIdQuery : IRequest<Cra>
{
    public int Id { get; init; }
}

// ReSharper disable once UnusedType.Global
public class GetCraByIdQueryHandler : IRequestHandler<GetCraByIdQuery, Cra?>
{
    private readonly IApplicationDbContext _context;

    public GetCraByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Cra?> Handle(GetCraByIdQuery request, CancellationToken cancellationToken)
    {
        return await _context.CraList.Include(cra => cra.Days).Include(c=>c.Mission)
            .FirstOrDefaultAsync(cra => cra.Id == request.Id, cancellationToken: cancellationToken)
            .ConfigureAwait(false);
    }
}
