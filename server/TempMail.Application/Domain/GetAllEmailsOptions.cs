namespace TempMail.Application.Domain;

public class GetAllEmailsOptions
{
    public string? From { get; init; }
    public string? SortField { get; set; }
    public SortOrder? SortOrder { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
}

public enum SortOrder
{
    Unsorted,
    Ascending,
    Descending
}