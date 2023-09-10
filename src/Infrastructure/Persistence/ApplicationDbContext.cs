using System.Reflection;
using ERP.Application.Common.Interfaces;
using ERP.Domain.Entities;
using ERP.Infrastructure.Identity;
using ERP.Infrastructure.Persistence.Interceptors;
using Duende.IdentityServer.EntityFramework.Options;
using MediatR;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace ERP.Infrastructure.Persistence;

public class ApplicationMigrationDbContext: DbContext
{
    public DbSet<Client> Clients => Set<Client>();
    public DbSet<Mission> Missions => Set<Mission>();
    public DbSet<Cra> CraList => Set<Cra>();
    public DbSet<CraDay> CraDays => Set<CraDay>();
    
    public DbSet<Invoice> Invoices  => Set<Invoice>();
    public DbSet<InvoiceLine> InvoiceLines  => Set<InvoiceLine>();
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        builder.Entity<Invoice>()
            .HasMany(i => i.InvoiceLines);
        base.OnModelCreating(builder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer("Server=127.0.0.1,1433;Database=ERPDb;User=sa;Password=abcDEF123#;TrustServerCertificate=true;MultipleActiveResultSets=true");
        }
    }
}
public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>, IApplicationDbContext
{
    private readonly IMediator _mediator;
    private readonly AuditableEntitySaveChangesInterceptor _auditableEntitySaveChangesInterceptor;
    
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options,
        IOptions<OperationalStoreOptions> operationalStoreOptions,
        IMediator mediator,
        AuditableEntitySaveChangesInterceptor auditableEntitySaveChangesInterceptor) 
        : base(options, operationalStoreOptions)
    {
        _mediator = mediator;
        _auditableEntitySaveChangesInterceptor = auditableEntitySaveChangesInterceptor;
    }    
    public DbSet<Client> Clients => Set<Client>();
    public DbSet<Mission> Missions => Set<Mission>();
    public DbSet<Cra> CraList => Set<Cra>();
    public DbSet<CraDay> CraDays => Set<CraDay>();

    public DbSet<Invoice> Invoices  => Set<Invoice>();
    public DbSet<InvoiceLine> InvoiceLines  => Set<InvoiceLine>();
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        builder.Entity<Invoice>()
            .HasMany(i => i.InvoiceLines);
        base.OnModelCreating(builder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.AddInterceptors(_auditableEntitySaveChangesInterceptor);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        await _mediator.DispatchDomainEvents(this);

        return await base.SaveChangesAsync(cancellationToken);
    }
}
