namespace TempMail.Application.Services;

public interface ISmtpServerService
{
    Task StartAsync();
    Task StopAsync();
}