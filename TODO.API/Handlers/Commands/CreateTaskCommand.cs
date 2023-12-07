using DB.Models;
using Domain.DTO;
using Humanizer;
using MediatR;
using TODO.API.Handlers.Queries;
using TODO.API.Services;

namespace TODO.API.Handlers.Commands
{
    public record CreateTaskCommand(TaskDTO task, string authorId) : IRequest<bool>;
    public class CreateTaskCommandHandler : IRequestHandler<CreateTaskCommand, bool>
    {
        public TasksService _taskService;
        public CreateTaskCommandHandler(TasksService _taskService)
        {
            this._taskService = _taskService;
        }
        public async Task<bool> Handle(CreateTaskCommand request, CancellationToken cancellationToken)
        {
            return await _taskService
                .CreateTaskFromDTO(request.task, Guid.Parse(request.authorId))
                != null;
        }
    }
}
