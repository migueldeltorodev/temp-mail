using Microsoft.Extensions.Diagnostics.HealthChecks;
using TempMail.Application.Database;

namespace TempMail.Api.Health;

public class DatabaseHealthCheck : IHealthCheck
{
    public const string Name = "Database";
    private readonly ApplicationDbContext _context;
    private readonly ILogger<DatabaseHealthCheck> _logger;

    public DatabaseHealthCheck(ILogger<DatabaseHealthCheck> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = new CancellationToken())
    {
        try
        {
            if (await _context.Database.CanConnectAsync(cancellationToken))
            {
                return HealthCheckResult.Healthy("Database is healthy.");
            }
            const string errorMessage = "Unable to connect to the database.";
            _logger.LogError(errorMessage);
            return HealthCheckResult.Unhealthy(errorMessage);
        }
        catch (Exception ex)
        {
            const string errorMessage = "Database is unhealthy";  
            _logger.LogError(errorMessage, ex);  
            return HealthCheckResult.Unhealthy(errorMessage, ex);  
        }
    }
}