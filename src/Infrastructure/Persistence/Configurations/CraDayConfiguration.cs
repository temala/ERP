using ERP.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ERP.Infrastructure.Persistence.Configurations;

public class CraDayConfiguration : IEntityTypeConfiguration<CraDay>
{
    public void Configure(EntityTypeBuilder<CraDay> builder)
    {
        builder.Property(t => t.Day)
            .IsRequired();

        builder.Property(t => t.Month)
            .IsRequired();

        builder.Property(t => t.Year)
            .IsRequired();

        builder.HasIndex(t => t.CraId);
    }
}
