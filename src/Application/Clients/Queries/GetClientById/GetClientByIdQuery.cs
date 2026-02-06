using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using MediatR;

namespace ERP.Application.Clients.Queries.GetClientById;


public record GetClientByIdQuery : IRequest<Client>
{
    public int Id { get; init; }
}

// ReSharper disable once UnusedType.Global
public class GetClientByIdQueryHandler : IRequestHandler<GetClientByIdQuery, Client?>
{
    private readonly IApplicationDbContext _context;

    public GetClientByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Client?> Handle(GetClientByIdQuery request, CancellationToken cancellationToken)
    {
        return await _context.Clients.FindAsync(request.Id);
    }
}
