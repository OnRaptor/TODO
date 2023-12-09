using Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB.Models
{
    public class ToDoTask
    {
        public Guid Id {  get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime? Deadline { get; set; } = null;
        public TaskPriority Priority { get; set; }
        public bool IsCompleted { get; set; }
        public Guid AuthorId { get; set; }
        public User Author { get; set; }
    }
}
