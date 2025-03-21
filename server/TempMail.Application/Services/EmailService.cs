using Microsoft.Extensions.Configuration;
using TempMail.Application.Domain;
using TempMail.Application.Repositories;
using SmorcIRL.TempMail;
using SmorcIRL.TempMail.Models;

namespace TempMail.Application.Services;

public class EmailService : IEmailService
{
    private readonly IInboxRepository _inboxRepository;
    private readonly IEmailRepository _emailRepository;
    
    public EmailService(IInboxRepository inboxRepository, IEmailRepository emailRepository)
    {
        _inboxRepository = inboxRepository;
        _emailRepository = emailRepository;
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

    public async Task<Email> ProcessEmailAsync(Email request, CancellationToken token)
    {
        await _emailRepository.AddAsync(request, token);
        return request;
    }

    public async Task<IEnumerable<Email>> GetEmailsForInboxAsync(Guid inboxId, CancellationToken token)
    {
        return await _emailRepository.GetByInboxIdAsync(inboxId, token);
    }

    public Task<bool> DeleteExpiredInboxesAsync(CancellationToken token)
    {
        throw new NotImplementedException();
    }
}