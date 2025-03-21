using TempMail.Application.Domain;

namespace TempMail.Application.Services;

public interface IEmailService
{
    Task<Inbox> CreateInboxAsync(CancellationToken token);
    Task<Email> ProcessEmailAsync(Email request, CancellationToken token);
    Task<IEnumerable<Email>> GetEmailsForInboxAsync(Guid inboxId, CancellationToken token);
    Task<bool> DeleteExpiredInboxesAsync(CancellationToken token);
}