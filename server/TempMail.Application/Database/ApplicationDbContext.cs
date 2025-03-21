using Microsoft.EntityFrameworkCore;
using TempMail.Application.Domain;

namespace TempMail.Application.Database;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Inbox> Inboxes { get; init; }
    public DbSet<Email> Emails { get; init; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Inbox>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Address).IsRequired();
            entity.Property(e => e.CreatedAt).IsRequired();
            entity.HasIndex(e => e.Address).IsUnique();
        });

        modelBuilder.Entity<Email>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.From).IsRequired();
            entity.Property(e => e.Subject).IsRequired();
            entity.Property(e => e.Body).IsRequired();
            entity.Property(e => e.ReceivedAt).IsRequired();
            
            entity.HasOne(e => e.Inbox)
                .WithMany(i => i.Emails)
                .HasForeignKey(e => e.InboxId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}