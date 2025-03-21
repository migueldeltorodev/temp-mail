@echo off
dotnet ef migrations add %1 --project TempMail.Application\TempMail.Application.csproj --startup-project TempMail.Api\TempMail.Api.csproj
dotnet ef database update --project TempMail.Application\TempMail.Application.csproj --startup-project TempMail.Api\TempMail.Api.csproj