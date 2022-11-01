using ERP.Application.Common.Interfaces;
using ERP.Application.Clients.Queries.GetClientsWithPagination;
using ERP.Domain.Entities;
using ERP.Domain.Events;
using MediatR;

namespace ERP.Application.Clients.Commands.CreateClient;

public record CreateClientCommand : IRequest<ClientListItemDto>
{
    public string Name { get; set; }

    public string? ContactName { get; set; }

    public string? Email { get; set; }

    public string? Telephone { get; set; }

    public string? CompanyName { get; set; }

    public string? Siret { get; set; }

    public string? Tva { get; set; }

    public string? Title { get; set; }

    public string? Address { get; set; }

    public string? PostalCode { get; set; }

    public string? Town { get; set; }

    public string? Country { get; set; }
}

public class CreateClientCommandHandler : IRequestHandler<CreateClientCommand, ClientListItemDto>
{
    private readonly IApplicationDbContext _context;

    public CreateClientCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ClientListItemDto> Handle(CreateClientCommand request, CancellationToken cancellationToken)
    {
        var entity = new Client
        {
            Name = request.Name,
            ContactName = request.ContactName,
            Email = request.Email,
            Telephone = request.Telephone,
            CompanyName = request.CompanyName,
            Siret = request.Siret,
            Tva = request.Tva,
            Title = request.Title,
            Address = request.Address,
            PostalCode = request.PostalCode,
            Town = request.Town,
            Country = request.Country,
        };

        entity.AddDomainEvent(new ClientCreatedEvent(entity));

        _context.Clients.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return new ClientListItemDto() {Id = entity.Id, Name = entity.Name};
    }
}