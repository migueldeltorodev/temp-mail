using TempMail.Application.Services;

namespace TempMail.Api.Endpoints.Inbox;

public static class CreateInboxEndpoint
{
    private const string Name = "CreateInbox";

    public static IEndpointRouteBuilder MapCreateInbox(this IEndpointRouteBuilder app)
    {
        app.MapPost(ApiEndpoints.Emails.CreateInbox, async (
            IEmailService emailService,
            CancellationToken token) =>
        {
            try
            {
                var inbox = await emailService.CreateInboxAsync(token);
                return Results.Created($"Inbox/{inbox.Id}", inbox.Address);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Results.InternalServerError("Error creating inbox");
            }
        })
        .WithName(Name);
        
        return app;
    }
    
}