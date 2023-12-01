using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB.Models
{
    public class TODO
    {
        public int Id {  get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime Deadline {  get; set; }
        public string Priority { get; set; }
        public bool IsCompleted { get; set; }
        public User Author { get; set; }
    }
}
