using DB.Models;
using MediatR;

namespace TODO.API.Handlers.Queries
{
    public record GetTasksQuery() : IRequest<ToDoTask>;
    public class GetTasksQueryHandler : IRequestHandler<GetTasksQuery, ToDoTask>
    {
        public async Task<ToDoTask> Handle(GetTasksQuery request, CancellationToken cancellationToken)
        {
            return new ToDoTask();
        }
    }
}
