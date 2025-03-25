using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TempMail.Application.Database;
using TempMail.Application.Repositories;
using TempMail.Application.Services;

namespace TempMail.Application;

public static class ApplicationServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // Repositories
        services.AddScoped<IInboxRepository, InboxRepository>();
        services.AddScoped<IEmailRepository, EmailRepository>();
        
        // Services
        services.AddScoped<IInboxService, InboxService>();
        services.AddScoped<IEmailService, EmailService>();
        
        return services;
    }

    public static IServiceCollection AddDatabase(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(connectionString));
        
        return services;
    }
}