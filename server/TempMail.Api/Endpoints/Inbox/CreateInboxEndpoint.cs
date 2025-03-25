using TempMail.Api.Mapping;
using TempMail.Application.Services;

namespace TempMail.Api.Endpoints.Inbox;

public static class CreateInboxEndpoint
{
    private const string Name = "CreateInbox";

    public static IEndpointRouteBuilder MapCreateInbox(this IEndpointRouteBuilder app)
    {
        app.MapPost(ApiEndpoints.V1.Inboxes.CreateInbox, async (
            IInboxService inboxService,
            CancellationToken token) =>
        {
            try
            {
                var inbox = await inboxService.CreateInboxAsync(token);
                var response = inbox.MapToInboxResponse();
                return Results.Created($"Inbox/{response.Id}", response.Email);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Results.InternalServerError("Error creating inbox");
            }
        })
        .WithName(Name)
        .WithApiVersionSet(ApiVersioning.VersionSet)  
        .HasApiVersion(1.0);
        
        return app;
    }
    
}