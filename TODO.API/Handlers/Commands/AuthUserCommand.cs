using MediatR;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using TODO.API.Common;
using TODO.API.Services;

namespace TODO.API.Handlers.Commands
{
    public record AuthUserCommand(
        string username,
        string password)
        : IRequest<string>;
    public class AuthUserCommandHandler : IRequestHandler<AuthUserCommand, string>
    {
        public UserService _userService;
        public AuthUserCommandHandler(UserService _userService)
        {
            this._userService = _userService;
        }
        public async Task<string> Handle(AuthUserCommand request, CancellationToken cancellationToken)
        {
            if (await _userService.VerifyUser(request.username, request.password))
            {
                var user = await _userService.FindUserByUserName(request.username);

                var claims = new List<Claim> { new Claim("UUID", user!.Id.ToString()) };
                // создаем JWT-токен
                var jwt = new JwtSecurityToken(
                        issuer: AuthOptions.ISSUER,
                        audience: AuthOptions.AUDIENCE,
                        claims: claims,
                        expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(60)),
                        signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

                return new JwtSecurityTokenHandler().WriteToken(jwt);
            }
            else
            {
                throw new BadHttpRequestException("Invalid auth data");
            }
        }
    }
}
