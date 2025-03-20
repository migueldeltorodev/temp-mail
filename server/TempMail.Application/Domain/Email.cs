namespace TempMail.Application.Domain;

public class Email
{
    public Guid Id { get; set; }
    public Guid InboxId { get; set; }
    public string From { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public DateTime ReceivedAt { get; set; }
    public Inbox? Inbox { get; set; }
}