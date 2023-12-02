using DB.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
