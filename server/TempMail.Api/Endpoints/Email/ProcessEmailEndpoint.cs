using TempMail.Api.Mapping;
using TempMail.Application.Services;
using TempMail.Contracts.Requests;

namespace TempMail.Api.Endpoints.Email;

public static class ProcessEmailEndpoint
{
    private const string Name = "ProcessEmail";

    public static IEndpointRouteBuilder MapProcessEmail(this IEndpointRouteBuilder app)
    {
        app.MapPost(ApiEndpoints.Emails.ProcessEmail, async (
            ProcessEmailRequest request,
            IEmailService emailService,
            IInboxService inboxService,
            CancellationToken token) =>
        {
            try
            {
                var inbox = await inboxService.GetByAddressAsync(request.To, token);

                if (inbox is null)
                {
                    throw new Exception($"No active inbox found for {request.To}");
                }
                
                var inboxId = inbox.Id;
                var email = request.MapToEmail(inboxId);
                var result = await emailService.ProcessEmailAsync(email, token);
                return TypedResults.Ok(result.MapToEmailResponse());
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