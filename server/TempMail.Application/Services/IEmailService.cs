using TempMail.Application.Domain;

namespace TempMail.Application.Services;

public interface IEmailService
{
    Task<Email> ProcessEmailAsync(Email request, CancellationToken token);
    Task<IEnumerable<Email>> GetEmailsForInboxAsync(Guid inboxId, CancellationToken token);
    Task<int> GetCountAsync(string? from, CancellationToken cancellationToken = default);
}