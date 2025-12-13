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

        // ToDo : Add OnModelCreating for indexes for Permalink uniqueness
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Quiz>()
                .HasIndex(q => q.Permalink)
                .IsUnique();
        }

    }
}
