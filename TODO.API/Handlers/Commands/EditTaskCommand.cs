using Domain.DTO;
using MediatR;
using TODO.API.Services;

namespace TODO.API.Handlers.Commands
{
    public record EditTaskCommand(TaskDTO newTask) : IRequest<TaskDTO>;
    public class EditTaskCommandHandler : IRequestHandler<EditTaskCommand, TaskDTO>
    {
        public TasksService _taskService;
        public EditTaskCommandHandler(TasksService _taskService)
        {
            this._taskService = _taskService;
        }
        public async Task<TaskDTO> Handle(EditTaskCommand request, CancellationToken cancellationToken)
        {
            return await _taskService.EditTask(request.newTask);
        }
    }
}
