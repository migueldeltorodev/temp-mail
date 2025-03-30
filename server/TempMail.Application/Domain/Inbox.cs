namespace TempMail.Application.Domain;

public class Inbox
{
    public Guid Id { get; init; }
    public string Address { get; set; } = string.Empty;
    public DateTime CreatedAt { get; init; }
    // TODO: add ExpiredAt prop
    public List<Email> Emails { get; set; } = new();
}