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
        public DbSet<User> Users { get; set; }
        public DbSet<TODO> Tasks { get; set; }
    }
}
