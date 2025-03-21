using TempMail.Application.Services;

namespace TempMail.Api.Endpoints.Inbox;

public static class CreateInboxEndpoint
{
    public const string Name = "CreateInbox";

    public static IEndpointRouteBuilder MapCreateInbox(this IEndpointRouteBuilder app)
    {
        app.MapPost(ApiEndpoints.Emails.CreateInbox, async (IEmailService emailService) =>
        {
            try
            {
                var inbox = await emailService.CreateInboxAsync();
                return Results.Created($"Inbox/{inbox.Id}", inbox);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Results.InternalServerError("Error creating inbox");
            }
        });
        
        return app;
    }
    
}