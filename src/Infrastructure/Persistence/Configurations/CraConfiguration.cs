using ERP.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ERP.Infrastructure.Persistence.Configurations;

public class CraConfiguration : IEntityTypeConfiguration<Cra>
{
    public void Configure(EntityTypeBuilder<Cra> builder)
    {
        builder.Property(t => t.Month)
            .IsRequired();

        builder.Property(t => t.Year)
            .IsRequired();

        builder.HasOne(t => t.Mission)
            .WithMany()
            .HasForeignKey(t => t.MissionId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(t => t.Days)
            .WithOne(d => d.Cra)
            .HasForeignKey(d => d.CraId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(t => t.MissionId);
        builder.HasIndex(t => new { t.Year, t.Month });
    }
}
