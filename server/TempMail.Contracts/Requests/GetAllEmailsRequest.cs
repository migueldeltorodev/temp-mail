namespace TempMail.Contracts.Requests;

public class GetAllEmailsRequest : PagedRequest
{
    public required string? From { get; init; } // From: to filter emails by the sender email
    public string? SortBy { get; init; }
}