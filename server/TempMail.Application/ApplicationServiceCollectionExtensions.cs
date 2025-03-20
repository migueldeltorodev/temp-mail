using Microsoft.Extensions.DependencyInjection;

namespace TempMail.Application;

public static class ApplicationServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        return services;
    }
}