using TempMail.Application.Domain;

namespace TempMail.Application.Services;

public interface IInboxService
{
    Task<Inbox> CreateInboxAsync(CancellationToken token);
    Task<Inbox?> GetByAddressAsync(string address, CancellationToken cancellationToken);
    Task<List<Inbox>> GetExpiredInboxes(DateTime expirationDate, CancellationToken cancellationToken);
    Task<bool> RemoveExpiredInboxes(List<Inbox> inboxes, CancellationToken cancellationToken);
}