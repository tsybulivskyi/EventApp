FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY *.sln .
COPY ["./EventsApp.API/EventsApp.API.csproj", "EventsApp.API/"]
COPY ["./EventsApp.Data/EventsApp.Data.csproj", "EventsApp.Data/"]
RUN dotnet restore 

COPY . .
WORKDIR "/src/"
RUN dotnet build  -c Release -o /app/build

FROM build AS publish
RUN dotnet publish  -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EventsApp.API.dll"]
