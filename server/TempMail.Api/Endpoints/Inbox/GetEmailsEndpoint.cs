using TempMail.Application.Services;

namespace TempMail.Api.Endpoints.Inbox;

public static class GetEmailsEndpoint
{
    public const string Name = "GetEmails";

    public static IEndpointRouteBuilder MapGetEmails(this IEndpointRouteBuilder app)
    {
        app.MapGet(ApiEndpoints.Emails.GetEmails, async (
            Guid id,
            IEmailService emailService) =>
        {
            try
            {
                var emails = await emailService.GetEmailsForInboxAsync(id);
                return TypedResults.Ok(emails);
            }
            catch (Exception ex)
            {
                // logger.LogError(ex, "Error retrieving emails");
                return Results.InternalServerError("Error retrieving emails");
            }
        });
            
        return app;
    }
}