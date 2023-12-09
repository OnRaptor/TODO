using FluentValidation;
using TODO.API.Handlers.Commands;
using TODO.API.Services;

namespace TODO.API.Validators.Commands
{
    public class EditTaskValidator : AbstractValidator<EditTaskCommand>
    {
        public EditTaskValidator(TasksService _tasksService) 
        {
            RuleFor(e => e.newTask).NotNull().WithMessage("newTask не может быть null");
            RuleFor(e => e.newTask.Id)
                .NotNull().WithMessage("newTask.Id не может быть null")
                .MustAsync(async (x, c) => await _tasksService.TaskExists(x.ToString()))
                .WithMessage("Задачи не существует"); ;
        }
    }
}
