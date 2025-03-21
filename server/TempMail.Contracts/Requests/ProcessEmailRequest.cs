namespace TempMail.Contracts.Requests;

public class ProcessEmailRequest
{
    public required string To { get; init; }
    public required string From { get; init; } 
    public required string Subject { get; init; }
    public required string Body { get; init; }
}