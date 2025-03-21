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

    public async Task<Inbox> AddAsync(Inbox inbox, CancellationToken cancellationToken)
    {
        return await _inboxRepository.AddAsync(inbox, cancellationToken);
    }

    public async Task<Inbox?> GetByAddressAsync(string address, CancellationToken cancellationToken)
    {
        return await _inboxRepository.GetByAddressAsync(address, cancellationToken);
    }
}