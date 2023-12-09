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
                .NotNull().WithMessage("User can't be empty");
            RuleFor(x => x.user.Name).Length(5, 20).WithMessage("Min length - 5, max - 20");
            RuleFor(x => x.user.Name)
                .MustAsync(
                async (x, canc) =>
                {
                    var result = await _userService.FindUserByUserName(x);
                    return result == null;
                }
                ).WithMessage("Nickname already taken");
            RuleFor(x => x.password)
                .Length(10, 20).WithMessage("Min length - 10, max - 20");
        }
    }
}
