using Infrastructure.Security;
using Infrastructure.Security.Tokens;
using KTMSApi;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using Infrastructure.IRepositories;
using Infrastructure.Repositories;
using Repositories.Repositories;
using Repositories.IRepositories;
using KTMS.Infrastructure.DataBase;
using Services.Providers;
using Services.Services;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;
builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000", "http://192.168.8.180:3000", "http://192.168.8.206:3000","http://192.168.100.26:3000", "https://reactktms.galex.md")
         .AllowAnyHeader()
         .AllowCredentials()
         .AllowAnyMethod();

    });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<KTMSDbContext>(opt => opt.UseSqlServer(configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("KTMSApi")

   ));
#region Dependencies
builder.Services.AddScoped<IMeetingRepository, MeetingRepository>();
builder.Services.AddScoped<IProfileRepository, ProfileRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IDropDownRepository, DropDownRepository>();
builder.Services.AddTransient<ITokenRepository, TokenRepository>();
builder.Services.AddTransient<ITokenService, TokenService>();

//builder.Services.AddSingleton<IDatabaseBackupProvider>(provider =>
//{
//    var backupDirectory = Directory.GetCurrentDirectory(); 
//    return new SqlServerDatabaseBackupProvider(configuration.GetConnectionString("DefaultConnection"), backupDirectory);
//});
//builder.Services.AddHostedService<DatabaseBackupService>();
#endregion
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "https://localhost:5001",
        ValidAudience = "https://localhost:5001",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"))
    };
});
builder.Services.AddAuthorization();
JsonSerializerOptions options = new()
{
    ReferenceHandler = ReferenceHandler.IgnoreCycles,
    WriteIndented = true
};
var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors();

app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.UseHttpsRedirection();


app.Run();