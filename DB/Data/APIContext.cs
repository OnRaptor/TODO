using DB.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB.Data
{
    public class APIContext : DbContext
    {
        public APIContext(DbContextOptions<APIContext> options) : base(options)
        { }
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<TODO> Tasks { get; set; } = null!;
    }
}
