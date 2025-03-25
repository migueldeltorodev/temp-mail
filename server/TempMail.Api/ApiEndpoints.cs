namespace TempMail.Api;

public static class ApiEndpoints
{
    private const string ApiBase = "api";

    public static class V1
    {
        public static class Emails
        {
            private const string Base = $"{ApiBase}/emails";
        
            public const string GetEmails = $"{Base}/{{id:Guid}}";
            public const string ProcessEmail = $"{Base}";
        }
    
        public static class Inboxes
        {
            private const string Base = $"{ApiBase}/inboxes";
        
            public const string CreateInbox = $"{Base}";
            public const string DeleteInboxes = $"{Base}";
        }
    }
}