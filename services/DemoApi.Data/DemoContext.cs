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
        modelBuilder.Entity<EnquiryForm>()
            .ToTable(nameof(EnquiryForm))
            .HasKey(x => x.Id);
    }
}