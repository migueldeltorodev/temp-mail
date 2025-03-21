using System.Diagnostics.Contracts;
using TempMail.Application.Database;
using TempMail.Application.Domain;
using TempMail.Application.Repositories;
using TempMail.Contracts.Requests;

namespace TempMail.Api.Mapping;

public static class ContractMappings
{
    public static Email MapToEmail(this ProcessEmailRequest request, Guid inboxId)
    {
        return new Email
        {
            Id = Guid.NewGuid(),
            InboxId = inboxId,
            From = request.From,
            Subject = request.Subject,
            Body = request.Body,
            ReceivedAt = DateTime.UtcNow,
        };
    } 
}