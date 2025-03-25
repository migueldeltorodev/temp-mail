using TempMail.Api.Mapping;
using TempMail.Application.Services;
using TempMail.Contracts.Requests;

namespace TempMail.Api.Endpoints.Email;

public static class GetEmailsEndpoint
{
    private const string Name = "GetEmails";

    public static IEndpointRouteBuilder MapGetEmails(this IEndpointRouteBuilder app)
    {
        app.MapGet(ApiEndpoints.V1.Emails.GetEmails, async (
            Guid id,
            [AsParameters] GetAllEmailsRequest request,
            IEmailService emailService,
            CancellationToken token) =>
        {
            try
            {
                var options = request.MapToOptions();
                var emails = await emailService.GetEmailsForInboxAsync(id, token);
                var emailsCount = await emailService.GetCountAsync(options.From, token);
                var emailsResponse = emails.MapToEmailsResponse(
                    request.Page.GetValueOrDefault(PagedRequest.DefaultPage),
                    request.PageSize.GetValueOrDefault(PagedRequest.DefaultPageSize),
                    emailsCount);
                return TypedResults.Ok(emailsResponse);
            }
            catch (Exception ex)
            {
                // logger.LogError(ex, "Error retrieving emails");
                return Results.InternalServerError("Error retrieving emails");
            }
        })
        .WithName(Name)
        .WithApiVersionSet(ApiVersioning.VersionSet)  
        .HasApiVersion(1.0);
            
        return app;
    }
}