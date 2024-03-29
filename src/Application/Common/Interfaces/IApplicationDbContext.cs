﻿using ERP.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ERP.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Client> Clients { get; }
    DbSet<Mission> Missions { get; }
    DbSet<Cra> CraList { get; }
    DbSet<CraDay> CraDays { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
