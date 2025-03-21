using Microsoft.EntityFrameworkCore;
using TempMail.Application.Database;
using TempMail.Application.Domain;

namespace TempMail.Application.Repositories;

public class InboxRepository : IInboxRepository
{
    private readonly ApplicationDbContext _context;

    public InboxRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Inbox> AddAsync(Inbox inbox, CancellationToken cancellationToken)
    {
        var entry = await _context.Inboxes.AddAsync(inbox, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return entry.Entity;
    }

    public async Task<Inbox?> GetByAddressAsync(string address, CancellationToken cancellationToken)
    {
        var inbox = await _context.Inboxes.FirstOrDefaultAsync(i => i.Address.Equals(address, StringComparison.OrdinalIgnoreCase), cancellationToken: cancellationToken);

        if (inbox is null)
        {
            return null;
        }
        
        return inbox;    
    }
}