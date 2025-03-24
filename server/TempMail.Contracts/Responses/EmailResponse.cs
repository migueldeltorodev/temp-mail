namespace TempMail.Contracts.Responses;

public class EmailResponse
{
    public required Guid Id { get; init; }
    public required string From { get; init; }
    public required string Subject { get; init; }
    public required string Body { get; set; }
    public required DateTime ReceivedAt { get; init; }
}