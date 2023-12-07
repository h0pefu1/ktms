#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["KTMSApi/KTMSApi.csproj", "KTMSApi/"]
COPY ["Security/Security.csproj", "Security/"]
COPY ["Domain/Domain.csproj", "Domain/"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/"]
COPY ["Repositories/Repositories.csproj", "Repositories/"]
COPY ["DTO/DTO.csproj", "DTO/"]
COPY ["Services/Services.csproj", "Services/"]
RUN dotnet restore "KTMSApi/KTMSApi.csproj"
COPY . .
WORKDIR "/src/KTMSApi"
RUN dotnet build "KTMSApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "KTMSApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "KTMSApi.dll"]