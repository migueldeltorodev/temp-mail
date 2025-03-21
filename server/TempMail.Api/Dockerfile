FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["TempMail.Api/TempMail.Api.csproj", "TempMail.Api/"]
COPY ["TempMail.Application/TempMail.Application.csproj", "TempMail.Application/"]
COPY ["TempMail.Contracts/TempMail.Contracts.csproj", "TempMail.Contracts/"]
RUN dotnet restore "TempMail.Api/TempMail.Api.csproj"
COPY . .
WORKDIR "/src/TempMail.Api"
RUN dotnet build "TempMail.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "TempMail.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TempMail.Api.dll"]
