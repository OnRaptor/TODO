using DB.Models;
using Domain.DTO;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

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
                Priority = taskData.Priority
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
                                   Id = task.Id
                               }).ToListAsync();

        public async Task DeleteTask(Guid taskId)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task != null)
            {
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<TaskDTO> EditTask(TaskDTO newTask)
        {
            var task = await _context.Tasks.FindAsync(newTask.Id);
            if (task != null)
            {
                task.Description = newTask.Description ?? task.Description;
                task.Name = newTask.Name ?? task.Name;
                task.Deadline = newTask.Deadline;
                task.Priority = newTask.Priority;
                task.IsCompleted = newTask.IsCompleted;
            }
            await _context.SaveChangesAsync();
            return newTask;
        }

        public async Task<bool> TaskExists(string taskId)
            => (await _context.Tasks.FindAsync(taskId)) != null;
    }
}
