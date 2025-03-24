using SmorcIRL.TempMail;
using TempMail.Application.Domain;
using TempMail.Application.Repositories;

namespace TempMail.Application.Services;

public class InboxService : IInboxService
{
    private readonly IInboxRepository _inboxRepository;

    public InboxService(IInboxRepository inboxRepository)
    {
        _inboxRepository = inboxRepository;
    }

    public async Task<Inbox> CreateInboxAsync(CancellationToken token)
    {
        try
        {
            var mailClient = new MailClient();
            
            var (username, password) = GenerateRandomCredentials();
            
            var domain = await GetAvailableDomain(mailClient);
            var address = $"{username}@{domain}";
            
            await mailClient.Register(address, password);
            
            var inbox = new Inbox
            {
                Id = Guid.NewGuid(),
                Address = address,
                CreatedAt = DateTime.UtcNow
            };
            
            await _inboxRepository.AddAsync(inbox, token);
            return inbox;
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Failed to create disposable email: {ex.Message}", ex);
        }
    }
    
    private static (string username, string password) GenerateRandomCredentials()
    {
        var username = $"user_{Guid.NewGuid().ToString("N").Substring(0, 8)}";
        var password = Guid.NewGuid().ToString("N").Substring(0, 12);
        return (username, password);
    }
    
    private static async Task<string> GetAvailableDomain(MailClient mailClient)
    {
        var domains = await mailClient.GetAvailableDomains();
        
        if (domains.Length == 0)
        {
            throw new InvalidOperationException("No available email domains found");
        }
        
        return await mailClient.GetFirstAvailableDomainName();
    }

    public async Task<Inbox?> GetByAddressAsync(string address, CancellationToken cancellationToken)
    {
        return await _inboxRepository.GetByAddressAsync(address, cancellationToken);
    }

    public async Task<List<Inbox>> GetExpiredInboxes(DateTime expirationDate, CancellationToken cancellationToken)
    {
        var result = await _inboxRepository.GetExpiredInboxes(expirationDate, cancellationToken);
        return result;
    }

    public async Task<bool> RemoveExpiredInboxes(List<Inbox> inboxes, CancellationToken cancellationToken)
    {
        return await _inboxRepository.RemoveExpiredInboxes(inboxes, cancellationToken);
    }
}