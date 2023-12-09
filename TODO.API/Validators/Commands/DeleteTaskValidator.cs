using FluentValidation;
using TODO.API.Handlers.Commands;
using TODO.API.Services;

namespace TODO.API.Validators.Commands
{
    public class DeleteTaskValidator : AbstractValidator<DeleteTaskCommand>
    {
        public DeleteTaskValidator(TasksService _tasksService)
        {
            RuleFor(e => e.taskID)
                .MustAsync(async (x, c) => await _tasksService.TaskExists(x))
                .WithMessage("Task doesn't exist");
        }
    }
}
