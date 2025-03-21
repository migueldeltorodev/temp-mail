namespace TempMail.Application.Domain;

public class Email
{
    public Guid Id { get; init; }
    public Guid InboxId { get; init; }
    public string From { get; init; } = string.Empty;
    public string Subject { get; init; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public DateTime ReceivedAt { get; init; }
    public Inbox? Inbox { get; init; }
}