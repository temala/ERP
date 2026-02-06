# Stage 1: Build Angular frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY FrontUI/Angular-WebUI/client-app/package*.json ./
RUN npm ci --legacy-peer-deps
COPY FrontUI/Angular-WebUI/client-app/ ./
RUN npm run build -- --configuration production

# Stage 2: Build .NET backend
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS backend-build
WORKDIR /src
COPY ERP.sln ./
COPY src/Domain/Domain.csproj src/Domain/
COPY src/Application/Application.csproj src/Application/
COPY src/Infrastructure/Infrastructure.csproj src/Infrastructure/
COPY src/WebUI/WebUI.csproj src/WebUI/
RUN dotnet restore
COPY src/ src/
WORKDIR /src/src/WebUI
RUN dotnet publish -c Release -o /app/publish --no-restore

# Stage 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app

RUN adduser --disabled-password --gecos "" appuser

COPY --from=backend-build /app/publish .
COPY --from=frontend-build /app/frontend/dist/client-app ./wwwroot

ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 8080

USER appuser
ENTRYPOINT ["dotnet", "ERP.WebUI.dll"]
