FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["MibHub.Processor.csproj", ""]
RUN dotnet restore "./MibHub.Processor.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "MibHub.Processor.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MibHub.Processor.csproj" -c Kubernetes -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MibHub.Processor.dll"]