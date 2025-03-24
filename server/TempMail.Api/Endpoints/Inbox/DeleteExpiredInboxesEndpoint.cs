using TempMail.Application.Services;

namespace TempMail.Api.Endpoints.Inbox;

public static class DeleteExpiredInboxesEndpoint
{
    private const string Name = "DeleteExpiredInboxes";

    public static IEndpointRouteBuilder MapDeleteExpiredInboxes(this IEndpointRouteBuilder app)
    {
        app.MapDelete(ApiEndpoints.Inboxes.DeleteInboxes, async (
                IInboxService inboxService,
                CancellationToken cancellationToken) =>
        {
            var expirationTime = DateTime.UtcNow.AddHours(-1);
            var expiredInboxes = await inboxService.GetExpiredInboxes(expirationTime, cancellationToken);

            if (expiredInboxes.Count != 0)
            {
                await inboxService.RemoveExpiredInboxes(expiredInboxes, cancellationToken);
            }    
            
            return Results.Ok();
        })
        .WithName(Name);
        
        return app;
    }
}