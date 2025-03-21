using TempMail.Application.Domain;

namespace TempMail.Application.Services;

public interface IInboxService
{
    Task<Inbox> AddAsync(Inbox inbox, CancellationToken cancellationToken);
    Task<Inbox?> GetByAddressAsync(string address, CancellationToken cancellationToken);
}