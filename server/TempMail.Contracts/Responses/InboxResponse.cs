namespace TempMail.Contracts.Responses;

public class InboxResponse
{
    public required Guid Id { get; init; }
    public required string Email { get; init; }
}