using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebAPI.Data;
using WebAPI.Mappings;
using WebAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Database Connection
var quizDbConnectionString = builder.Configuration.GetConnectionString("QuizDBConnectionString");
builder.Services.AddDbContext<QuizDbContext>(options =>
    options.UseSqlServer(quizDbConnectionString));

// Configure custom services
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddScoped<IAuthService, AuthService>();

var jwtKey = builder.Configuration["Jwt:Key"];

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable authentication and authorization middleware
app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
