using ERP.Application.Common.Exceptions;
using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using ERP.Domain.Events;
using MediatR;

namespace ERP.Application.CraList.Commands.DeleteCra;

public record DeleteCraCommand(int Id) : IRequest;

public class DeleteCraCommandHandler : IRequestHandler<DeleteCraCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteCraCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteCraCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.CraList
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Cra), request.Id);
        }

        _context.CraList.Remove(entity);

        entity.AddDomainEvent(new CraDeletedEvent(entity));

        await _context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

        return Unit.Value;
    }
}
