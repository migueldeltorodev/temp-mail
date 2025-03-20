namespace TempMail.Application.Domain;

public class Inbox
{
    public Guid Id { get; set; }
    public string Address { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public List<Email> Emails { get; set; } = new();
}