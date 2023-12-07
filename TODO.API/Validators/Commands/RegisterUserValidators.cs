using FluentValidation;
using TODO.API.Handlers.Commands;
using TODO.API.Services;

namespace TODO.API.Validators.Commands
{
    public class RegisterUserValidator : AbstractValidator<RegisterUserCommand>
    {
        public RegisterUserValidator(UserService _userService)
        {
            RuleFor(x => x.user)
                .NotNull().WithMessage("User не может быть пустым");
            RuleFor(x => x.user.Name).Length(5, 20).WithMessage("Мин длина - 5, макс - 20");
            RuleFor(x => x.user.Name)
                .MustAsync(
                async (x, canc) =>
                {
                    var result = await _userService.FindUserByUserName(x);
                    return result == null;
                }
                ).WithMessage("Никнейм занят");
            RuleFor(x => x.password)
                .Length(10, 20).WithMessage("Мин длина - 10, макс - 20");
        }
    }
}
