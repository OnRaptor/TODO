﻿using MediatR;
using TODO.API.Services;

namespace TODO.API.Handlers.Commands
{
    public record DeleteTaskCommand(Guid taskID) : IRequest;
    public class DeleteTaskCommandHandler : IRequestHandler<DeleteTaskCommand>
    {
        public TasksService _taskService;
        public DeleteTaskCommandHandler(TasksService _taskService)
        {
            this._taskService = _taskService;
        }
        public async Task Handle(DeleteTaskCommand request, CancellationToken cancellationToken)
        {
            await this._taskService.DeleteTask(request.taskID);
        }
    }
}
