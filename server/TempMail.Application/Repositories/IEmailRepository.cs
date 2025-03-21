using TempMail.Application.Domain;

namespace TempMail.Application.Repositories;

public interface IEmailRepository
{
    Task<Email> AddAsync(Email email, CancellationToken cancellationToken);
    Task<IEnumerable<Email>> GetByInboxIdAsync(Guid inboxId, CancellationToken cancellationToken);
}