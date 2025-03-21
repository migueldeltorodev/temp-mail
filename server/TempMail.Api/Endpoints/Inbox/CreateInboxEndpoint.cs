using TempMail.Api.Mapping;
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
                var response = inbox.MapToInboxResponse();
                return Results.Created($"Inbox/{response.Id}", response.Email);
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