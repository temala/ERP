using ERP.Application.Common.Exceptions;
using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ERP.Application.CraList.Queries.PrintCraById;


public record PrintCraByIdQuery : IRequest<Stream>
{
    public int Id { get; init; }
}

// ReSharper disable once UnusedType.Global
public class PrintCraByIdQueryHandler : IRequestHandler<PrintCraByIdQuery, Stream>
{
    private readonly IApplicationDbContext _context;
    private readonly IPdfGenerator<Cra> _pdfGenerator;

    public PrintCraByIdQueryHandler(IApplicationDbContext context, IPdfGenerator<Cra> pdfGenerator)
    {
        _context = context;
        _pdfGenerator = pdfGenerator;
    }

    public async Task<Stream> Handle(PrintCraByIdQuery request, CancellationToken cancellationToken)
    {
        var cra =  await _context.CraList.Include(cra => cra.Days).Include(c=>c.Mission).Include(c=>c.Mission.Client)
            .FirstOrDefaultAsync(cra => cra.Id == request.Id, cancellationToken: cancellationToken)
            .ConfigureAwait(false);

        if (cra == null)
        {
            throw new NotFoundException(nameof(Cra), request.Id);
        }

        return _pdfGenerator.GeneratePdf(cra);
    }
}
