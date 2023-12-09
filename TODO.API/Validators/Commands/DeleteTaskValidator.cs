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
                .NotNull()
                .Must(x => Guid.TryParse(x, out _)).WithMessage("taskId должен быть типа Guid");
            RuleFor(e => e.taskID)
                .MustAsync(async (x, c) => await _tasksService.TaskExists(x))
                .WithMessage("Задачи не существует");
        }
    }
}
