using Microsoft.EntityFrameworkCore;
using TempMail.Application.Database;
using TempMail.Application.Domain;

namespace TempMail.Application.Repositories;

public class EmailRepository : IEmailRepository
{
    private readonly ApplicationDbContext _context;

    public EmailRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Email> AddAsync(Email email, CancellationToken cancellationToken)
    {
        var entry = await _context.Emails.AddAsync(email, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return entry.Entity;
    }

    public async Task<IEnumerable<Email>> GetByInboxIdAsync(Guid inboxId, CancellationToken cancellationToken)
    {
        return await _context.Emails
            .Where(e => e.InboxId == inboxId)
            .OrderByDescending(e => e.ReceivedAt)
            .ToListAsync(cancellationToken);
    }
}