using Domain.DTO;
using MediatR;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using TODO.API.Common;
using TODO.API.Services;

namespace TODO.API.Handlers.Commands
{
    public record RegisterUserCommand(UserDTO user, string password) : IRequest<string>;
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, string>
    {
        public UserService _userService;
        public RegisterUserCommandHandler(UserService _userService)
        {
            this._userService = _userService;
        }
        public async Task<string> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userService.CreateUser(request.user, request.password);

            var claims = new List<Claim> { new Claim("UUID", user.Id.ToString()) };
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    claims: claims,
                    expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(60)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }


    }
}
