using Microsoft.EntityFrameworkCore;
using System;
using WebAPI.Data;
using WebAPI.Mappings;

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

// Configure AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
