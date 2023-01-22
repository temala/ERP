using AutoMapper;
using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Microsoft.Extensions.DependencyInjection.Cras.Queries.GetCraById;


public record GetCraByIdQuery : IRequest<Cra>
{
    public int Id { get; init; }
}

// ReSharper disable once UnusedType.Global
public class GetCraByIdQueryHandler : IRequestHandler<GetCraByIdQuery, Cra?>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetCraByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<Cra?> Handle(GetCraByIdQuery request, CancellationToken cancellationToken)
    {
        return await _context.CraList.Include(cra => cra.Days).Include(c=>c.Mission).FirstOrDefaultAsync(cra => cra.Id == request.Id);
    }
}
