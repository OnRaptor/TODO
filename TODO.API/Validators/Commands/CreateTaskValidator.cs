using Domain.DTO;
using FluentValidation;
using TODO.API.Handlers.Commands;

namespace TODO.API.Validators.Commands
{
    public class CreateTaskValidator : AbstractValidator<TaskDTO>
    {
        public CreateTaskValidator()
        {
            RuleFor(e => e.Name).NotEmpty().WithMessage("Task name can't be empty");
        }
    }
}
