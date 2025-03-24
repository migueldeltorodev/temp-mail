using System.Diagnostics.Contracts;
using TempMail.Application.Database;
using TempMail.Application.Domain;
using TempMail.Application.Repositories;
using TempMail.Contracts.Requests;
using TempMail.Contracts.Responses;

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

    public static InboxResponse MapToInboxResponse(this Inbox inbox)
    {
        return new InboxResponse
        {
            Id = inbox.Id,
            Email = inbox.Address,
        };
    }

    public static EmailsResponse MapToEmailsResponse(
        this IEnumerable<Email> emails,
        int page,
        int pageSize,
        int totalCount)
    {
        return new EmailsResponse
        {
            Items = emails.Select(MapToEmailResponse),
            Page = page,
            PageSize = pageSize,
            Total = totalCount
        };
    }
    
    public static EmailResponse MapToEmailResponse(this Email email)
    {
        return new EmailResponse
        {
            Id = email.Id,
            From = email.From,
            Subject = email.Subject,
            Body = email.Body,
            ReceivedAt = email.ReceivedAt,
        };
    }

    public static GetAllEmailsOptions MapToOptions(this GetAllEmailsRequest request)
    {
        return new GetAllEmailsOptions
        {
            From = request.From,
            SortField = request.SortBy?.Trim('+', '-'),
            SortOrder = request.SortBy is null ? SortOrder.Unsorted :
                request.SortBy.StartsWith('-') ? SortOrder.Descending : SortOrder.Ascending,
            Page = request.Page.GetValueOrDefault(PagedRequest.DefaultPage),
            PageSize = request.PageSize.GetValueOrDefault(PagedRequest.DefaultPageSize)
        };
    }
}