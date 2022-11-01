using AutoMapper;
using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using MediatR;

namespace Microsoft.Extensions.DependencyInjection.Clients.Queries.GetClientById;


public record GetClientByIdQuery : IRequest<Client>
{
    public int Id { get; init; }
}

// ReSharper disable once UnusedType.Global
public class GetClientByIdQueryHandler : IRequestHandler<GetClientByIdQuery, Client?>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetClientByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<Client?> Handle(GetClientByIdQuery request, CancellationToken cancellationToken)
    {
        return await _context.Clients.FindAsync(request.Id);
    }
}
