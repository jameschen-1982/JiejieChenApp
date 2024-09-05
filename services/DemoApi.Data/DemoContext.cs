using DemoApi.Domain;
using Microsoft.EntityFrameworkCore;

namespace DemoApi.Data;

public class DemoContext : DbContext
{
    public DemoContext(DbContextOptions<DemoContext> options) : base(options)
    {
    }
    
    public DbSet<EnquiryForm> EnquiryForms { get; set; } 
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EnquiryForm>(x =>
        {
            x.HasKey(y => y.Id)
                .HasAnnotation("SqlServer:Identity", "1, 1")
                ;
            x.Property(y => y.Email).HasMaxLength(250);
            x.Property(y => y.FirstName).HasMaxLength(250);
            x.Property(y => y.LastName).HasMaxLength(250);
            x.Property(y => y.Phone).HasMaxLength(250);
            x.Property(y => y.Company).HasMaxLength(250);
            x.Property(y => y.TimeSubmitted).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });

        modelBuilder.Entity<EnquiryForm>()
            .ToTable(nameof(EnquiryForm));
    }
}