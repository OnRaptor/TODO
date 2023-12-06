using DB.Models;
using Domain.DTO;
using Humanizer;
using MediatR;
using TODO.API.Handlers.Queries;

namespace TODO.API.Handlers.Commands
{
    public record CreateTaskCommand(TaskDTO task) : IRequest<ToDoTask>;
    public class CreateTaskCommandHandler : IRequestHandler<CreateTaskCommand, ToDoTask>
    {
        public async Task<ToDoTask> Handle(CreateTaskCommand request, CancellationToken cancellationToken)
        {
            return new ToDoTask();
        }
    }
}
