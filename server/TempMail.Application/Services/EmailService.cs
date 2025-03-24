using TempMail.Application.Domain;
using TempMail.Application.Repositories;
using SmorcIRL.TempMail;

namespace TempMail.Application.Services;

public class EmailService : IEmailService
{
    private readonly IEmailRepository _emailRepository;
    
    public EmailService(IEmailRepository emailRepository)
    {
        _emailRepository = emailRepository;
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

    public async Task<int> GetCountAsync(string? from, CancellationToken cancellationToken = default)
    {
        return await _emailRepository.GetCountAsync(from, cancellationToken);
    }
}