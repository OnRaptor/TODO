using FluentValidation;
using TODO.API.Handlers.Commands;
using TODO.API.Services;

namespace TODO.API.Validators.Commands
{
    public class EditTaskValidator : AbstractValidator<EditTaskCommand>
    {
        public EditTaskValidator(TasksService _tasksService)
        {
            RuleFor(e => e.newTask.Id)
                .MustAsync(async (x, c) => await _tasksService.TaskExists(x))
                .WithMessage("Task doesn't exists");

            RuleFor(e => e.newTask.Name).NotEmpty();
            RuleFor(e => e.newTask.Description).NotEmpty();
        }
    }
}
