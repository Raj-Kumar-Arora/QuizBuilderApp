using Microsoft.EntityFrameworkCore;
using System;
using WebAPI.Models;

namespace WebAPI.Data
{
    public class QuizDbContext : DbContext
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
    }
}
