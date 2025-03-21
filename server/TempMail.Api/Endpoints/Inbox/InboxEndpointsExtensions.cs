namespace TempMail.Api.Endpoints.Inbox;

public static class InboxEndpointsExtensions
{
    public static IEndpointRouteBuilder MapInboxEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapCreateInbox();
        app.MapGetEmails();
        return app;
    }
}