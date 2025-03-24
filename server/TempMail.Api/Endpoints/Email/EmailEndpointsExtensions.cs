namespace TempMail.Api.Endpoints.Email;

public static class EmailEndpointsExtensions
{
    public static IEndpointRouteBuilder MapEmailEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGetEmails();
        app.MapProcessEmail();
        return app;
    }
}