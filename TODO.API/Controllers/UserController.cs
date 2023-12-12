using Domain.DTO;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TODO.API.Handlers.Commands;
using TODO.API.Handlers.Queries;

namespace TODO.API.Controllers
{
    [Route("/")]
    [ApiController]
    [Produces("application/json")]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="mediator"></param>
        public UserController(IMediator mediator) => _mediator = mediator;

        [HttpPost("register")]
        public async Task<string> Register(RegisterUserCommand request)
            => await _mediator.Send(request);

        [HttpPost("login")]
        public async Task<string> Login(AuthUserCommand request)
            => await _mediator.Send(request);

        [Authorize]
        [HttpGet("userinfo")]
        public async Task<UserDTO> GetUserInfo()
            => await _mediator.Send(new GetUserInfoQuery(Guid.Parse(User?.Claims.FirstOrDefault()?.Value)));
    }
}
