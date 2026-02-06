using ERP.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ERP.Infrastructure.Persistence.Configurations;

public class ClientConfiguration : IEntityTypeConfiguration<Client>
{
    public void Configure(EntityTypeBuilder<Client> builder)
    {
        builder.Property(t => t.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(t => t.ContactName)
            .HasMaxLength(200);

        builder.Property(t => t.Email)
            .HasMaxLength(256);

        builder.Property(t => t.Telephone)
            .HasMaxLength(30);

        builder.Property(t => t.CompanyName)
            .HasMaxLength(200);

        builder.Property(t => t.Siret)
            .HasMaxLength(14);

        builder.Property(t => t.Tva)
            .HasMaxLength(20);

        builder.Property(t => t.Title)
            .HasMaxLength(100);

        builder.Property(t => t.Address)
            .HasMaxLength(500);

        builder.Property(t => t.PostalCode)
            .HasMaxLength(10);

        builder.Property(t => t.Town)
            .HasMaxLength(100);

        builder.Property(t => t.Country)
            .HasMaxLength(100);

        builder.HasIndex(t => t.Name);
        builder.HasIndex(t => t.Email);
    }
}
