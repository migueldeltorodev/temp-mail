using TempMail.Api.Endpoints.Inbox;

namespace TempMail.Api.Endpoints;

public static class EndpointsExtensions
{
    public static IEndpointRouteBuilder MapApiEndpoints(this IEndpointRouteBuilder app)  
    {        
        app.MapInboxEndpoints();  
        return app;  
    }  
}