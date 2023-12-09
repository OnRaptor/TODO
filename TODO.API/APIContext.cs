using DB.Models;
using Microsoft.EntityFrameworkCore;

namespace TODO.API
{
    public class APIContext : DbContext
    {
        public APIContext(DbContextOptions<APIContext> options) : base(options)
        { }
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<ToDoTask> Tasks { get; set; } = null!;
    }
}
