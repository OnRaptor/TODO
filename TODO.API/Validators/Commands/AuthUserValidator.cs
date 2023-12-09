using FluentValidation;
using TODO.API.Handlers.Commands;

namespace TODO.API.Validators.Commands
{
    public class AuthUserValidator : AbstractValidator<AuthUserCommand>
    {
        public AuthUserValidator() 
        {
            RuleFor(x => x.username).NotEmpty();
            RuleFor(x => x.password).NotEmpty();
        }
    }
}
