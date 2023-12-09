using FluentValidation;
using TODO.API.Handlers.Commands;

namespace TODO.API.Validators.Commands
{
    public class CreateTaskValidator : AbstractValidator<CreateTaskCommand>
    {
        public CreateTaskValidator() 
        {
            RuleFor(e => e.task).NotNull();
            RuleFor(e => e.task.Name).NotNull().WithMessage("task.Name не может быть null");
            RuleFor(e => e.task.Description).NotNull().WithMessage("task.Description не может быть null");
        }
    }
}
