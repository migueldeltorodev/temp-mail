using TempMail.Application.Services;

namespace TempMail.Api.Endpoints.Inbox;

public static class GetEmailsEndpoint
{
    private const string Name = "GetEmails";

    public static IEndpointRouteBuilder MapGetEmails(this IEndpointRouteBuilder app)
    {
        app.MapGet(ApiEndpoints.Emails.GetEmails, async (
            Guid id,
            IEmailService emailService,
            CancellationToken token) =>
        {
            try
            {
                var emails = await emailService.GetEmailsForInboxAsync(id, token);
                return TypedResults.Ok(emails);
            }
            catch (Exception ex)
            {
                // logger.LogError(ex, "Error retrieving emails");
                return Results.InternalServerError("Error retrieving emails");
            }
        })
        .WithName(Name);
            
        return app;
    }
}