using Asp.Versioning;
using TempMail.Api.Endpoints;
using TempMail.Api.Health;
using TempMail.Application;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

builder.Services.AddHealthChecks()  
    .AddCheck<DatabaseHealthCheck>(DatabaseHealthCheck.Name);

builder.Services.AddApiVersioning(x =>
{
    x.DefaultApiVersion = new ApiVersion(1.0);
    x.AssumeDefaultVersionWhenUnspecified = true;
    x.ReportApiVersions = true;
    x.ApiVersionReader = new MediaTypeApiVersionReader("api-version");
}).AddMvc();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
            "http://localhost:5173",
            "https://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddOutputCache(x =>  
{  
    x.AddBasePolicy(c => c.Cache());  
    x.AddPolicy("EmailCache", c =>  
    {  
        c.Cache()  
            .Expire(TimeSpan.FromMinutes(1))  
            .SetVaryByQuery(new[]{"from", "sortBy", "page", "pageSize"})  
            .Tag("emails");  
    });
});

builder.Services.AddApplication();
builder.Services.AddDatabase(config["Database:ConnectionString"]!);

var app = builder.Build();

app.CreateApiVersionSet();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseOutputCache();

app.MapHealthChecks("_health");

app.MapApiEndpoints();

app.Run();
