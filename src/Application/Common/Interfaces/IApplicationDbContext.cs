using ERP.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ERP.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Client> Clients { get; }
    DbSet<Mission> Missions { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
