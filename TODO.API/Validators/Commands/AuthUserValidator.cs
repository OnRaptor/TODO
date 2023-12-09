using FluentValidation;
using TODO.API.Handlers.Commands;
using TODO.API.Services;

namespace TODO.API.Validators.Commands
{
    public class AuthUserValidator : AbstractValidator<AuthUserCommand>
    {
        public AuthUserValidator(UserService _userService)
        {
            RuleFor(x => x.username).NotEmpty();
            RuleFor(x => x.username)
                .MustAsync(
                async (x, canc) =>
                {
                    var result = await _userService.FindUserByUserName(x);
                    return result != null;
                }
                ).WithMessage("User not found");
            RuleFor(x => x.password).NotEmpty();
        }
    }
}
