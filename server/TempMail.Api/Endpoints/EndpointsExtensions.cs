namespace TempMail.Api.Endpoints;

public static class EndpointsExtensions
{
    public static IEndpointRouteBuilder MapApiEndpoints(this IEndpointRouteBuilder app)  
    {        
        // app.MapEmailEndpoints();  
        // app.MapSmtpServerEndpoints();  
        return app;  
    }  
}