namespace TempMail.Api;

public static class ApiEndpoints
{
    private const string ApiBase = "api";

    public static class Emails
    {
        private const string Base = $"{ApiBase}/inboxes";
        
        public const string GetEmails = $"{Base}/{{idOrSlug}}/emails";
        public const string CreateInbox = $"{Base}";
    }
}