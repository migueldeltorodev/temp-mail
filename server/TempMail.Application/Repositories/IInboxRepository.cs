using TempMail.Application.Domain;

namespace TempMail.Application.Repositories;

public interface IInboxRepository
{
    Task<Inbox> AddAsync(Inbox inbox, CancellationToken cancellationToken);
    Task<Inbox?> GetByAddressAsync(string address, CancellationToken cancellationToken);
}