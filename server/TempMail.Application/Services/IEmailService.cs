using TempMail.Application.Domain;

namespace TempMail.Application.Services;

public interface IEmailService
{
    Task<Inbox> CreateInboxAsync();
    Task<Email> ProcessEmailAsync(string to, string from, string subject, string body);
    Task<IEnumerable<Email>> GetEmailsForInboxAsync(Guid inboxId);
    Task<bool> DeleteExpiredInboxesAsync();
}