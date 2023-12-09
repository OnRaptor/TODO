using Domain.DTO;
using MediatR;
using TODO.API.Services;

namespace TODO.API.Handlers.Commands
{
    public record CreateTaskCommand(TaskDTO task, string authorId) : IRequest<string>;
    public class CreateTaskCommandHandler : IRequestHandler<CreateTaskCommand, string>
    {
        public TasksService _taskService;
        public CreateTaskCommandHandler(TasksService _taskService)
        {
            this._taskService = _taskService;
        }
        public async Task<string> Handle(CreateTaskCommand request, CancellationToken cancellationToken)
        {
            var task = await _taskService
                .CreateTaskFromDTO(request.task, Guid.Parse(request.authorId));
            return task.Id.ToString();
        }
    }
}
