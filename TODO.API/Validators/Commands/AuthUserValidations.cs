using FluentValidation;
using TODO.API.Handlers.Commands;

namespace TODO.API.Validators.Commands
{
    public class AuthUserValidations : AbstractValidator<AuthUserCommand>
    {
        public AuthUserValidations() 
        {
            RuleFor(x => x.username).NotEmpty();
            RuleFor(x => x.password).NotEmpty();
        }
    }
}
