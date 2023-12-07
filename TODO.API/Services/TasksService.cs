using DB.Models;
using Domain.DTO;
using Microsoft.EntityFrameworkCore;

namespace TODO.API.Services
{
    public class TasksService
    {
        private readonly APIContext _context;
        public TasksService(APIContext _context)
        {
            this._context = _context;
        }

        public async Task<ToDoTask> CreateTaskFromDTO(TaskDTO taskData, Guid authorId)
        {
            var task = await _context.Tasks.AddAsync(new ToDoTask
            {
                AuthorId = authorId,
                Name = taskData.Name,
                IsCompleted = taskData.IsCompleted,
                Deadline = taskData.Deadline,
                Description = taskData.Description,
                Priority = taskData.Priority,
            });
            await _context.SaveChangesAsync();
            return task.Entity;
        }

        public async Task<List<TaskDTO>> GetAllUserTask(Guid authorId)
            => await (from task in _context.Tasks
                               where task.AuthorId == authorId
                               select new TaskDTO 
                               {
                                   Deadline = task.Deadline,
                                   Description = task.Description,  
                                   Priority = task.Priority,
                                   IsCompleted= task.IsCompleted,
                                   Name = task.Name,
                               }).ToListAsync();

        public async Task DeleteTask(Guid taskId)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task != null)
                _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }
    }
}
