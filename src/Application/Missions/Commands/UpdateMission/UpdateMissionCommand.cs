using ERP.Application.Common.Exceptions;
using ERP.Application.Common.Interfaces;
using ERP.Application.Clients.Queries.GetClientsWithPagination;
using ERP.Domain.Entities;
using MediatR;

namespace ERP.Application.Clients.Commands.UpdateClient;

public record UpdateClientCommand : IRequest<Client>
{
    public int Id { get; set; }
    
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

public class UpdateClientCommandHandler : IRequestHandler<UpdateClientCommand,Client>
{
    private readonly IApplicationDbContext _context;

    public UpdateClientCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Client> Handle(UpdateClientCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Clients
            .FindAsync(new object[] {request.Id}, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Client), request.Id);
        }

        entity.Name = request.Name;
        entity.ContactName = request.ContactName;
        entity.Email = request.Email;
        entity.Telephone = request.Telephone;
        entity.CompanyName = request.CompanyName;
        entity.Siret = request.Siret;
        entity.Tva = request.Tva;
        entity.Title = request.Title;
        entity.Address = request.Address;
        entity.PostalCode = request.PostalCode;
        entity.Town = request.Town;
        entity.Country = request.Country;

        await _context.SaveChangesAsync(cancellationToken);

        return entity;
    }
}