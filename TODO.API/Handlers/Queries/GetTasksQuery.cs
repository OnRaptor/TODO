using DB.Models;
using Domain.DTO;
using MediatR;
using TODO.API.Services;

namespace TODO.API.Handlers.Queries
{
    public record GetTasksQuery(string authorId) : IRequest<List<TaskDTO>>;
    public class GetTasksQueryHandler : IRequestHandler<GetTasksQuery, List<TaskDTO>>
    {
        public TasksService _taskService;
        public GetTasksQueryHandler(TasksService _taskService)
        {
            this._taskService = _taskService;
        }
        public async Task<List<TaskDTO>> Handle(GetTasksQuery request, CancellationToken cancellationToken)
        {
            return await _taskService.GetAllUserTask(Guid.Parse(request.authorId));
        }
    }
}
