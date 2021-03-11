FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["Fac.Service.csproj", ""]
RUN dotnet restore "./Fac.Service.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "Fac.Service.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Fac.Service.csproj" -c Kubernetes -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Fac.Service.dll"]